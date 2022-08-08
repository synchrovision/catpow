<?php
add_action('wp_head',function(){
	if($tag=get_option('cp_tag_injection_wp_head')){
		echo stripslashes($tag);
	}
});
add_action('wp_body_open',function(){
	if($tag=get_option('cp_tag_injection_wp_body_open')){
		echo stripslashes($tag);
	}
});
add_action('wp_footer',function(){
	if($tag=get_option('cp_tag_injection_wp_footer')){
		echo stripslashes($tag);
	}
});
