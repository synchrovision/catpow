<?php

$theme_url=get_stylesheet_directory_uri();

$attributes=[
	'isTemplate'=>['type'=>'boolean','default'=>false],
	'vars'=>['type'=>'object','default'=>(object)[]],
	'classes'=>['source'=>'attribute','selector'=>'.wp-block-catpow-unit','attribute'=>'class','default'=>'wp-block-catpow-unit'],
	'sources'=>[
		'source'=>'query',
		'selector'=>'picture source',
		'query'=>['srcset'=>['source'=>'attribute','attribute'=>'srcset'],'device'=>['source'=>'attribute','attribute'=>'data-device']],
		'default'=>[
			['srcset'=>$theme_url.'/images/dummy.jpg','device'=>'tb'],
			['srcset'=>$theme_url.'/images/dummy.jpg','device'=>'sp']
		]
	],
	'mime'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'data-mime'],
	'src'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'src','default'=>$theme_url.'/images/dummy.jpg'],
	'alt'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'alt'],
	'code'=>['source'=>'text']
];
