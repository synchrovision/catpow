<?php
add_filter('wp_kses_allowed_html',function($allowedposttags){
	$allowedposttags['t-loop-content']=['name'=>true];
	return $allowedposttags;
});
$attributes=[
	'className'=>['type'=>'string'],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];