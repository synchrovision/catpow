<?php
/*cron*/
add_filter('cron_schedules',function($schedules){
	return $schedules+[
		'every_minutes'=>[
			'interval'=>60,
			'display'=>__( 'Every Minutes','Catpow')
		]
	];
});

add_action('cp_init',function(){
	cp::include_plugin_files('action/cp_init');
},10,1);

add_action('cp_setup',function(){
	cp::include_plugin_files('action/cp_setup');
},20);
add_action('parse_request',function($wp){
	cp::include_plugin_files('action/parse_request',compact('wp'));
});

/*init*/
add_action('init',function(){
	cp::include_plugin_files('action/init');
});

/*ログイン画面アクション*/
add_action('login_init',function(){
	cp::include_plugin_files('action/login_init');
});
add_action('login_form',function(){
	cp::include_plugin_files('action/login_form');
});
add_action('register_form',function(){
	cp::include_plugin_files('action/register_form');
});

/*APIアクション*/
add_action('rest_api_init',function($wp_rest_server){
	cp::include_plugin_files('action/rest_api_init');
});


/*管理画面アクション*/
add_action('admin_init',function(){
	cp::include_plugin_files('action/admin_init');
});
add_action('admin_head',function(){
	cp::include_plugin_files('action/admin_head');
});
add_action('admin_notices',function(){
	cp::include_plugin_files('action/admin_notices');
});
add_action('admin_menu',function(){
	cp::include_plugin_files('action/admin_menu');
});

/*ページ出力時アクション*/
add_action('wp',function(){
	cp::include_plugin_files('action/wp');
});
add_action('template_redirect',function(){
	cp::include_plugin_files('action/template_redirect');
});

/*サイト設定時アクション*/
add_action('after_switch_theme',function(){
	cp::include_plugin_files('action/after_switch_theme');
});
add_action('wpmu_new_blog',function($blog_id, $user_id, $domain, $path, $site_id, $meta){
	cp::include_plugin_files('action/wpmu_new_blog',compact(['blog_id','user_id','domain','path','site_id','meta']));
},10,6);
add_action('delete_blog',function($blog_id, $drop){
	cp::include_plugin_files('action/delete_blog',compact(['blog_id','drop']));
},10,2);


/*メール*/
add_action('phpmailer_init',function($phpmailer){
	cp::include_plugin_files('action/phpmailer_init',compact(['phpmailer']));
});

/*cronアクション*/
add_action('cp_cron_every_minutes',function(){
	cp::include_plugin_files('action/cron_every_minutes');
});
add_action('cp_cron_hourly',function(){
	cp::include_plugin_files('action/cron_hourly');
});
add_action('cp_cron_daily',function(){
	cp::include_plugin_files('action/cron_daily');
});

?>