<?php
add_action('login_enqueue_scripts',function(){
	add_filter('login_headerurl',function($url){return home_url();});
	add_filter('login_headertext',function($url){return get_bloginfo('name');});
	cp::enqueue_style('admin.css');
});