<?php
add_action('wp_dashboard_setup',function(){
	wp_add_dashboard_widget('catpow_git','Git',[Catpow\git_theme::class,'dashboard_widget_content']);
});