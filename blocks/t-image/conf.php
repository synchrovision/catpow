<?php

$theme_url=get_stylesheet_directory_uri();

$attributes=[
	'isTemplate'=>['type'=>'boolean','default'=>false],
	'classes'=>['source'=>'attribute','selector'=>'table','attribute'=>'class','default'=>'wp-block-catpow-t-image'],
	'src'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'src','default'=>$theme_url.'/images/dummy.jpg'],
	'alt'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'alt'],
	'loopImage'=>['source'=>'text','selector'=>'td','default'=>'[output image]'],
	'width'=>['source'=>'attribute','selector'=>'table','attribute'=>'width','default'=>'100%'],
	'marginTop'=>['type'=>'number','default'=>0],
	'marginBottom'=>['type'=>'number','default'=>0]
];
