<?php 
function use_instagram(){
	add_action('wp_enqueue_scripts',function(){
		cp::enqueue_style('instagram/instagram.css');
        cp::enqueue_script('instagram/instagram.js',array('jquery'));
	});
}

function ig_button($text='Instagramで登録',$action='record_ig_token',$param=false){
	global $cp_data_stock;
	$state=uniqid('cpig');
	$param=array_merge((array)$param,['action'=>$action]);
	$cp_data_stock->set($state,$param);
	$url=sprintf('https://api.instagram.com/oauth/authorize/?%s',http_build_query([
		'client_id' => get_option('cp_instagram_app_id'),
		'redirect_uri' => home_url().'/wp-content/plugins/catpow/lib/instagram/oauth_callback.php',
		'response_type' => 'code',
		'state'=>$state
	]));
?>
	<button type="submit" onclick="window.open('<?=$url?>',	'instagram_oauth_callback','width=600,height=600,menubar=no, toolbar=no, location=no,scrollbars=no');">
		<i class="fa fa-instagram"></i><?=$text?>
	</button>
<?php	
}
function ig_refresh_token(){
	$options = array('http' => array(
		'method' => 'POST',
		'content' => http_build_query([
			'client_id' => get_option('cp_instagram_app_id'),
			'redirect_uri' => home_url().'/wp-content/plugins/catpow/lib/instagram/oauth_callback.php',
			'scope' => 'basic+comments+relationships+likes',
			'response_type' => $_GET['code'],
			'state=' => $state
		])
	));
	$json = json_decode(file_get_contents('https://api.instagram.com/oauth/access_token',false, stream_context_create($options)));
	update_option('ig_access_token',$json->access_token);
	return $token->access_token;
}

function ig_gallery($prm=false){
	if(!$cp_ig_info=get_option('cp_ig_info')){echo('Instagramを使用するには管理画面から登録取得の処理を行ってください');return;}
	$default_prm=[
		'acount'=>key($cp_ig_info),
		'show_header'=>false,
		'show_caption'=>false,
		'show_navigation'=>true,
		'size'=>'thumbnail',
		'link'=>'instagram',//[instagram|lightbox|false]
		'count'=>12
	];
	$prm=array_merge($default_prm,(array)$prm);
	$user_id=$cp_ig_info[$prm['account']]['user_id'];
	$token=$cp_ig_info[$prm['account']]['access_token'];
	$json = json_decode(file_get_contents("https://api.instagram.com/v1/users/{$user_id}/media/recent/?count={$prm['count']}&access_token={$token}"));
	echo '<section class="instagram">';
	if($prm['show_header']){
		printf(
			'<header><h2><a href="%1$s"><img src="%2$s" alt="%3$s"></a>%3$s</h2></header>',
			'https://www.instagram.com/'.$json->data[0]->user->username.'/',
			$json->data[0]->user->profile_picture,
			$json->data[0]->user->full_name
		);
	}
	echo '<ul class="instagram">';
	foreach($json->data as $data){
		$img=$data->images->$prm['size']->url;
		switch($prm['link']){
			case 'instagram':$link=$data->link;break;
			case 'lightbox':$link=$data->images->standard_resolution->url;break;
			default: $link=false;
		}
		printf('<li class="ig_thumbnail" id="%s">','ig_thumbnail_'.$data->id);
		if($prm['link']){printf('<a href="%s" target="_brank"><img src="%s"/></a>',$link,$img);}
		else{printf('<img src="%s"/>',$img);}
		
		if($prm['show_caption']){printf('<div class="text">%s</div>',$data->caption->text);}
		echo '</li>';
	}
	echo '</ul>';
	echo '</section>';
}
?>