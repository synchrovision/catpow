<?php
use Catpow\gauth\cpgc;

if(!file_exists(__DIR__.'/vendor')){
	require_once(ABSPATH.'/wp-admin/includes/file.php');
	WP_Filesystem();;
	unzip_file( __DIR__.'/vendor.zip', __DIR__);
}

global $wpdb;
$wpdb->gcal=$wpdb->prefix.'gcal';


add_action('login_form',function(){
	?>
	<p>
		<a class="button sns_login google" href="<?=cpgc::get_login_url()?>">
			<?php \Catpow\image('sns/google.svg','Google'); ?>
			<?=__('Googleでログイン','Catpow')?>
		</a>
	</p>
	<?php
});


function cp_gauth_refresh_token(){
	$options = array('http' => array(
		'method' => 'POST',
		'content' => http_build_query([
			'grant_type' => 'refresh_token',
			'redirect_uri' => plugins_url('callee/oauth_callback.php',__FILE__),
			'client_id' => get_option('cp_gauth_crient_id'),
			'client_secret' => get_option('cp_gauth_crient_secret'),
			'refresh_token'=>get_option('cp_gauth_refresh_token')
		])
	));
	$token = json_decode(file_get_contents('https://accounts.google.com/o/oauth2/token', false, stream_context_create($options)));
	update_option('cp_gauth_access_token',$token->access_token);
	return $token->access_token;
}

function cp_gauth_get_profile($token){
	return json_decode(file_get_contents('https://www.googleapis.com/oauth2/v1/userinfo?'.http_build_query(['access_token'=>$token])));
}


function get_cp_gcal_task_time(){
	global $wpdb;
	$client = Catpow\gauth\cpgauth::get_gc();
	$service = new Google_Service_Calendar($client);
	$calendarList = $service->calendarList->listCalendarList();
	$nextSyncToken=$calendarList->getNextSyncToken();
	update_option('gcal_sync_token',$nextSyncToken);
	$cal_users=[];
	foreach($calendarList->getItems() as $user){
		$cal_users[$user->getSummary()]=$user->getId();
	}
	
	//「依頼日」のIDを取得
	$p_ids=[];
	$p_query=new WP_query(['post_type'=>'progress','post_parent'=>0,'post_status' => ['publish','private']]);
	if(have_posts($project)){
		foreach($p_query->posts as $value){
			array_push($p_ids,$value->ID);
		}
		var_dump($p_ids);
		$last_pro=end($p_query->posts[0])->ID;
	}
	
	//test cal_id=井上のID
	$cal_user = '井上　秀幸';
	$cal_id = '4ga5erdaajktv77lgr5mpe7ncg@group.calendar.google.com';
	
	//本日更新のイベントを検索
	//foreach($cal_users as $cal_user => $cal_id){
		$optParams = array(
			'orderBy' => 'startTime',
			'singleEvents' => true,
			'showDeleted' => true,
			'timeMax' => date('Y-m-d').'T23:00:00.000+09:00',
			'updatedMin' => '2017-04-28T00:00:00.000+09:00'
		);
		$events = $service->events->listEvents($cal_id, $optParams);
		while(true) {
			foreach ($events->getItems() as $event) {
				//それぞれのイベントのタスク時間を取得
				$event2 = $service->events->get($cal_id, $event->getId());
				$s_date=strtotime($event2->getStart()->getDateTime());
				$e_date=strtotime($event2->getEnd()->getDateTime());
				$diff = ($e_date - $s_date)/60;

				$eve_title=$event->getSummary();
				$eve_id=$event->getId();
				echo $event2->getStatus().':'.$cal_user.':'.$eve_title.':'.$eve_id.'、'.date("Y/m/d H:i",$s_date).'、'.$diff.'<br>';
				
				//wpのuser_idを取得
				$e_user= new WP_User_Query(array( 'meta_key' => 'cal_id', 'meta_value' => $cal_id ));
				
				//タイトルとユーザーが一致するものを検索
				$meta_query_args = array(
					array('key'=>'title','value'=>$eve_title,'compare'=>'='),
					array('key'=>'contractor','value'=>$e_user->results[0]->ID,'compare'=>'='),
				);

				//ポストのIDと依頼日を取得(複数あった場合は最後)
				$pp_ids=[];
				$pp_dates=[];
				$fault=[];
				$project=new WP_query(['post_type'=>'post','meta_query'=>$meta_query_args,'post_status' => ['publish','private']]);
				if(have_posts($project)){
					foreach($project->posts as $v){
						array_push($pp_ids,$v->ID);
						$pp_dates[$v->ID]=[];
						//var_dump($pp_ids);
						foreach($p_ids as $key=>$p_id){
							if(!empty(get_post_meta($v->ID,'_'.$p_id.'_date',true))){
								$pp_dates[$v->ID][$p_id]=get_post_meta($v->ID,'_'.$p_id.'_date',true);
							}else{
								$pp_dates[$v->ID][$p_id]=date('Y-m-d');
								break;
							}
						}
						array_push($fault,get_post_meta($v->ID,'title',true));
					}
					$pp_id=reset($pp_ids);
					$pp_date=reset($pp_dates);
					var_dump($pp_date);
				}
				if(empty($fault)){
					$event3 = $service->events->get($cal_id,$eve_id);
					$event3->setColorId("10");
					$updatedEvent = $service->events->update($cal_id,$eve_id, $event3);
					echo $updatedEvent->getUpdated().':'.$event3->getId();
				}

				$results = $wpdb->get_results("SELECT * FROM $wpdb->gcal WHERE eve_id = '{$eve_id}' LIMIT 1");
				//DBの中でeve_idが一致するものが無ければ新規作成
				
				if(empty($results) and $event2->getStatus()!=='cancelled'){
					//cal_relにポスト投稿
					$post = array(
						'post_title'=>$eve_title,
						'post_content'=>'',
						'post_status'=>'private',
						'post_type'=>'gcal_rel',
						'post_date_gmt'=>date("Y-m-d H:i:s",$s_date)
					);
					$post_id=wp_insert_post($post,$wp_error);
					//cal_relにポストメタを追加
					update_post_meta($post_id,'title',$eve_title);
					update_post_meta($post_id,'eve_id',$eve_id);
					update_post_meta($post_id,'cal_user',$cal_id);
					
					//DBに値を追加
					$wpdb->insert(
						$wpdb->gcal,
						array(
							'eve_id'=>$eve_id,
							'task_time'=>$diff
						),
						array(
							'%s',
							'%d'
						)
					);
				}else{
					//DBの中でeve_idが一致するものあれば更新
					if($event2->getStatus()==='cancelled'){
						$meta_query_args3 = array(
							array('key'=>'eve_id','value'=>$eve_id,'compare'=>'='),
						);
						$delete_query=new WP_query(['post_type'=>'gcal_rel','meta_query'=>$meta_query_args3,'post_status' => ['publish','private']]);
						$delete_p_id=wp_delete_post($delete_query->posts[0]->ID);
						delete_post_meta($delete_p_id,'title');
						delete_post_meta($delete_p_id,'eve_id');
						delete_post_meta($delete_p_id,'cal_user');
						$wpdb->delete(
							$wpdb->gcal,
							array(
								'eve_id'=>$eve_id
							)
						);
					}else{
						$meta_query_args3 = array(
							array('key'=>'eve_id','value'=>$eve_id,'compare'=>'='),
						);
						$update_query=new WP_query(['post_type'=>'gcal_rel','meta_query'=>$meta_query_args3,'post_status' => ['publish','private']]);
						wp_update_post(array('post_date_gmt'=>date("Y-m-d H:i:s",$s_date)),$wp_error);
						update_post_meta($update_query->posts[0]->ID,'title',$eve_title);
						$wpdb->update(
							$wpdb->gcal,
							array(
								'task_time'=>$diff
							),
							array('eve_id'=>$eve_id),
							array(
								'%s',
								'%d'						
							)
						);
					}
				}
				
				//タイトルとユーザーが一致し、依頼日より後、もしくは完了日までのタスク時間合計を取得
				if(!empty($last_pro)){
					$meta_query_args2 = array(
						array('key'=>'title','value'=>$eve_title,'compare'=>'='),
						array('key'=>'cal_user','value'=>$cal_id,'compare'=>'='),
						'date_query' => array(
							array(
							'after'=>array($pp_date),
							'before'=>array($last_pro),
							'inclusive'=>true
							)
						)
					);
				}else{
					$meta_query_args2 = array(
						array('key'=>'title','value'=>$eve_title,'compare'=>'='),
						array('key'=>'cal_user','value'=>$cal_id,'compare'=>'=')
					);
				}
				if(!empty($pp_date)){
					$total_time=0;
					foreach($pp_date as $key=>$pdate){
						$next=next($pp_date);
						$next_key=array_search($next,$pp_date);
						if(!empty($next)){
							var_dump($pdate);
							var_dump($next);			
							$date_query_args2= array(
								array(
									'after'=>$pdate.' 00:00:00',
									'before'=>$next.' 00:00:00',
								)
							);
										
							$rel_id=[];
							$relation=new WP_query(['post_type'=>'gcal_rel','nopaging'=>true,'meta_query'=>$meta_query_args2,'date_query'=>$date_query_args2,'post_status' => ['publish','private']]);
							var_dump($relation->posts);
							if(have_posts($relation)){
								foreach($relation->posts as $post){
									array_push($rel_id,get_post_meta($post->ID,'eve_id',true));
								}
							}
							
							$my_gcal = $wpdb->get_results("SELECT task_time FROM $wpdb->gcal WHERE eve_id in('".implode("','",$rel_id)."')",ARRAY_N);
							
							$pro_time=0;
							foreach($my_gcal as $val){
								echo $eve_title.':'.$val[0].'<br>';
								$pro_time += $val[0];
							}
							echo $eve_title.':'.$pro_time.'<br>';
							
							if(!empty($pp_id)){
								update_post_meta($pp_id,'_'.$next_key.'_time',$pro_time);
							}
							$total_time += $pro_time;
							$pro_time=0;
						}
					}
				}
				if(!empty($pp_id)){
					//update_post_meta($pp_id,'total_time',$total_time);
				}
				$total_time=0;
			}
			$pageToken = $events->getNextPageToken();
			if ($pageToken) {
				$optParams = array('pageToken' => $pageToken);
				$events = $service->events->listEvents($cal_id, $optParams);
			} else {
				break;
			}
		//}
	}
}
