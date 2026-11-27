<?php

$theme_url=get_stylesheet_directory_uri();

$attributes=[
	'id'=>['source'=>'attribute','selector'=>'.wp-block-catpow-honeycomb','attribute'=>'id','default'=>''],
	'classes'=>['source'=>'attribute','selector'=>'.wp-block-catpow-honeycomb','attribute'=>'class','default'=>'wp-block-catpow-honeycomb'],
	'vars'=>['type'=>'object','default'=>(object)[]],
	'breakpoints'=>['source'=>'attribute','selector'=>'.wp-block-catpow-honeycomb','attribute'=>'data-breakpoints','default'=>'480,960'],
	'grid'=>['source'=>'attribute','selector'=>'.wp-block-catpow-honeycomb','attribute'=>'data-grid','default'=>'4 6,6 4,8 3'],
	'items'=>[
		'source'=>'query',
		'selector'=>'.wp-block-catpow-honeycomb__item',
		'query'=>[
			'classes'=>['source'=>'attribute','attribute'=>'class'],
			'order'=>['source'=>'attribute','attribute'=>'data-order'],
			'src'=>['source'=>'attribute','selector'=>'.wp-block-catpow-honeycomb__item-image','attribute'=>'src'],
			'title'=>['source'=>'html','selector'=>'.wp-block-catpow-honeycomb__item-contents-title'],
			'text'=>['source'=>'html','selector'=>'.wp-block-catpow-honeycomb__item-contents-text']
		],
		'default'=>[
			[
				'classes'=>'wp-block-catpow-honeycomb__item has-image has-title has-text',
				'order'=>'2 2 2 1,2 2 2 1,2 2 2 1',
				'src'=>$theme_url.'/images/dummy.jpg',
				'title'=>['Title'],
				'text'=>['Text']
			]
		]
	],
	'bp'=>['source'=>'attribute','default'=>'0']
];
