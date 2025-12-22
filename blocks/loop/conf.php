<?php
add_filter('wp_kses_allowed_html',function($allowedposttags){
	$allowedposttags['loop-content']=['name'=>true];
	return $allowedposttags;
});
$attributes=[
	'className'=>['type'=>'string'],
	'content_path'=>['type'=>'string'],
	'query'=>['type'=>'string','default'=>''],
	'config'=>['type'=>'string','source'=>'data-config','default'=>'']
];