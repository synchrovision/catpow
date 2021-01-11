<?php
/*
including catpow => cp_init:10
include config files from stylesheet or template directory
*/
global $auth_ip,
$post_types,$taxonomies,$static_pages,$comment_datas,
$nav_datas,$user_datas,$site_datas,$sidebar_datas,$use_widgets,
$wp_query,$cp_mode;

$cp_mode=isset($wp_query->query['cp_mode'])?$wp_query->query['cp_mode']:'';

include cp::get_file_path('config/site_config.php',cp::FROM_THEME|cp::FROM_DEFAULT);

if(!empty($auth_ip)){
	add_action('admin_init','ip_auth');
	if(!function_exists('ip_auth')){
		function ip_auth(){
			global $auth_ip;
			$ip=$_SERVER["REMOTE_ADDR"];
			if(in_array($ip,$auth_ip))return;
			if($ip=='::1' || $ip=='127.0.0.1')return;
			if(!wp_doing_ajax())wp_redirect(home_url());
		}
	}
	add_action('init',function(){
		global $auth_ip,$is_auth_ip;
		$is_auth_ip=true;
		$ip=$_SERVER["REMOTE_ADDR"];
		if(in_array($ip,$auth_ip))return;
		if($ip=='::1' || $ip=='127.0.0.1')return;
		$is_auth_ip=false;
	});
}

if(defined('MAINTENANCE_MODE') && MAINTENANCE_MODE){
	add_action('wp',function(){if(!current_user_can('edit_pages')){get_template_part('maintenance');exit;}});
}
define('CONCATENATE_SCRIPTS',false);

add_filter('option_home',function($url){
	static $cache;
	if(isset($cache)){return $cache;}
	return $cache=apply_filters_ref_array('option_home_ref',[$url]);
});


include cp::get_file_path('config/system_config.php',cp::FROM_THEME|cp::FROM_DEFAULT);
include cp::get_file_path('config/theme_config.php',cp::FROM_THEME|cp::FROM_DEFAULT);

