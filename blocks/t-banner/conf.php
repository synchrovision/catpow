<?php

$theme_url=get_stylesheet_directory_uri();

$attributes=[
	'isTemplate'=>['type'=>'boolean','default'=>false],
	'classes'=>['source'=>'attribute','selector'=>'table','attribute'=>'class','default'=>'wp-block-catpow-t-banner'],
	'src'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'src','default'=>$theme_url.'/images/dummy.jpg'],
	'alt'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'alt'],
	'url'=>['source'=>'attribute','selector'=>'a','attribute'=>'href','default'=>home_url()],
	'loopImage'=>['source'=>'text','selector'=>'td','default'=>'[output image]'],
	'width'=>['source'=>'attribute','selector'=>'table','attribute'=>'width','default'=>'100%'],
	'align'=>['source'=>'attribute','selector'=>'table','attribute'=>'align','default'=>'center'],
	'marginTop'=>['type'=>'number','default'=>1],
	'marginBottom'=>['type'=>'number','default'=>1]
];
