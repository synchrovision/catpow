<?php

$theme_url=get_stylesheet_directory_uri();

$attributes=[
	'isTemplate'=>['type'=>'boolean','default'=>false],
	'classes'=>['source'=>'attribute','selector'=>'table','attribute'=>'class','default'=>'wp-block-catpow-t-banners'],
	'items'=>[
		'source'=>'query',
		'selector'=>'tbody td:not(.is-spacer-cell)',
		'query'=>[
			'src'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'src'],
			'alt'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'alt'],
			'url'=>['source'=>'attribute','selector'=>'a','attribute'=>'href'],
			'loopImage'=>['source'=>'text','selector'=>'td','default'=>'[output image]']
		],
		'default'=>array_fill(0,5,['src'=>$theme_url.'/images/dummy.jpg','alt'=>'','url'=>home_url(),'loopImage'=>'[output image]'])
	],
	'width'=>['source'=>'attribute','selector'=>'table','attribute'=>'width','default'=>'100%'],
	'gapX'=>['type'=>'number','default'=>10],
	'gapY'=>['type'=>'number','default'=>10],
	'align'=>['source'=>'attribute','selector'=>'table','attribute'=>'align','default'=>'center'],
	'columns'=>['type'=>'number','default'=>2],
	'marginTop'=>['type'=>'number','default'=>1],
	'marginBottom'=>['type'=>'number','default'=>1]
];
