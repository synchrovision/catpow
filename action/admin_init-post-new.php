<?php
namespace Catpow;

add_filter('default_title',function($title){
	global $current_screen,$post_types;
	$default_title=$post_types[$current_screen->post_type]['default_title']??null;
	if(isset($default_title)){
		if(is_callable($default_title)){return $default_title();}
		return $default_title;
	}
	return $title;
});
add_filter('default_content',function($content){
	global $current_screen,$post_types;
	$default_content=$post_types[$current_screen->post_type]['default_content']??null;
	if(isset($default_content)){
		if(is_callable($default_content)){return $default_content();}
		return $default_title;
	}
	if($default_content=CP::get_template_contents('post/'.$current_screen->post_type.'/admin/default.php')){return $default_content;}
	return $content;
});
add_filter('user_can_richedit',function($can_richedit){
	if(isset($GLOBALS['post_types'][get_post_type()]['richedit'])){
		return $GLOBALS['post_types'][get_post_type()]['richedit'];
	}
	return $can_richedit;
});
