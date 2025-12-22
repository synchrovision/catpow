<?php
add_filter('wp_kses_allowed_html',function($allowedposttags){
	$allowedposttags['loop-block-content']=['name'=>true];
	return $allowedposttags;
});
$attributes=[
	'className'=>['type'=>'string'],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];