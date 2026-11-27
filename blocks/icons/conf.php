<?php

$theme_url=get_stylesheet_directory_uri();

$attributes=[
	'vars'=>['type'=>'object','default'=>(object)[]],
	'version'=>['type'=>'number','default'=>0],
	'classes'=>['source'=>'attribute','selector'=>'ul','attribute'=>'class','default'=>'wp-block-catpow-icons'],
	'items'=>[
		'source'=>'query',
		'selector'=>'.wp-block-catpow-icons__item',
		'query'=>[
			'classes'=>['source'=>'attribute','attribute'=>'class'],
			'src'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'src'],
			'alt'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'alt'],
			'href'=>['source'=>'attribute','selector'=>'a','attribute'=>'href']
		],
		'default'=>array_fill(0,3,['classes'=>'wp-block-catpow-icons__item','src'=>$theme_url.'/images/dummy_icon.svg','alt'=>'dummy','href'=>home_url()])
	]
];
