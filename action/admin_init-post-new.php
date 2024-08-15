<?php
namespace Catpow;

add_filter('default_title',function($title,$post){
	if(!empty($title)){return $title;}
	$default_title=CP::get_conf_data("post/{$post->post_type}")['default_title']??null;
	if(isset($default_title)){
		if(is_callable($default_title)){return $default_title();}
		return $default_title;
	}
	ob_start();
	CP::include_template_file("post/{$post->post_type}/admin/default_title.php",['post'=>$post]);
	return ob_get_clean();
},10,2);
add_filter('default_content',function($content,$post){
	if(!empty($content)){return $content;}
	$default_content=CP::get_conf_data("post/{$post->post_type}")['default_content']??null;
	if(isset($default_content)){
		if(is_callable($default_content)){return $default_content();}
		return $default_content;
	}
	ob_start();
	CP::include_template_file("post/{$post->post_type}/admin/default_content.php",['post'=>$post]);
	return ob_get_clean();
},10,2);
add_filter('user_can_richedit',function($can_richedit){
	if(isset($GLOBALS['post_types'][get_post_type()]['richedit'])){
		return $GLOBALS['post_types'][get_post_type()]['richedit'];
	}
	return $can_richedit;
});
