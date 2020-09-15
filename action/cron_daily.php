<?php
/*post expire*/

$date=date('Y-m-d');
$time=time();
if($lifes=get_option('_cp_post_life')){
	foreach($lifes as $post_id=>$dates){
		$crr_status=get_post_status($post_id);
		if(in_array($date,$dates)){
			if($crr_status=='private'){wp_publish_post($post_id);}
		}
		elseif($crr_status=='publish'){wp_update_post(['ID'=>$post_id,'post_status'=>'private']);}
	}
}
if($expires=get_option('_cp_post_expire')){
	foreach($expires as $post_id=>$expire){
		$crr_status=get_post_status($post_id);
		if($time>=strtotime($expire)){
			wp_update_post(['ID'=>$post_id,'post_status'=>'private']);
		}
	}
}

if($cron_file=cp::get_file_path('cron_daily.php',2)){include($cron_file);}