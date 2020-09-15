<?php
namespace Catpow;

function log_time($action,$start=false){
	static $log;
	if($start){$log[$action]=microtime(true);}
	else{error_log($action.'：'.(microtime(true)-$log[$action]));}
}

add_action('plugins_loaded',function(){
	error_log('plugins_loaded from request time：'.(microtime(true)-$_SERVER['REQUEST_TIME_FLOAT']));
},1000);

add_action('cp_setup',function(){log_time('cp_setup',1);},1);
add_action('cp_setup',function(){log_time('cp_setup');},1000);

add_action('init',function(){log_time('init',1);},1);
add_action('init',function(){log_time('init');},1000);

add_action('wp_head',function(){log_time('wp_head',1);},1);
add_action('wp_head',function(){log_time('wp_head');},1000);

add_action('admin_init',function(){log_time('admin_init',1);},1);
add_action('admin_init',function(){log_time('admin_init');},1000);

add_action('admin_head',function(){log_time('admin_head',1);},1);
add_action('admin_head',function(){log_time('admin_head');},1000);

add_action('rest_api_init',function(){log_time('rest_api_init',1);},1);
add_action('rest_api_init',function(){log_time('rest_api_init');},1000);

add_action('wp',function(){log_time('wp',1);},1);
add_action('wp',function(){log_time('wp');},1000);

add_action('wp_head',function(){log_time('wp_head',1);},1);
add_action('wp_head',function(){log_time('wp_head');},1000);

add_action('wp_footer',function(){log_time('wp_footer',1);},1);
add_action('wp_footer',function(){log_time('wp_footer');},1000);

add_action('shutdown',function(){
	error_log('total：'.(microtime(true)-$_SERVER['REQUEST_TIME_FLOAT']));
},1000);