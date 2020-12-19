<?php
add_filter('wp_kses_allowed_html',function($allowedposttags){
	$allowedposttags['formBlockContent']=['name'=>true,'action'=>true];
	return $allowedposttags;
});
$attributes=[
	'className'=>['type'=>'string'],
	'content_path'=>['type'=>'string'],
	'post_data_path'=>['type'=>'string'],
	'inputs'=>['type'=>'string'],
	'data_id'=>['type'=>'string'],
	'values'=>['type'=>'string']
];