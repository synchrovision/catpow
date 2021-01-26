<?php
add_filter('wp_kses_allowed_html',function($allowedposttags){
	$allowedposttags['swicherContent']=['cond'=>true];
	return $allowedposttags;
});
$attributes=[
	'factor'=>['type'=>'string','default'=>'schedule'],
	'field'=>['type'=>'string','default'=>''],
	'compare'=>['type'=>'string','default'=>'='],
	'values'=>['type'=>'string','default'=>"0:00~6:00\n6:00~12:00\n12:00~18:00\n18:00~24:00"]
];