<?php
$attributes=[
	'classes'=>[
		'source'=>'attribute',
		'selector'=>'table',
		'attribute'=>'class',
		'default'=>'wp-block-catpow-t-list has-font-weight-regular is-ordered has-font-size-middle has-marker-color-main'
	],
	'marginTop'=>['type'=>'number','default'=>0.5],
	'marginBetween'=>['type'=>'number','default'=>0.5],
	'marginBottom'=>['type'=>'number','default'=>0.5],
	'markerSize'=>['type'=>'string','default'=>'1em'],
	'markerWidth'=>['type'=>'string','default'=>'1.5em'],
	'markerMargin'=>['type'=>'string','default'=>'0.1em'],
	'markerClasses'=>[
		'source'=>'attribute',
		'selector'=>'.wp-block-catpow-t-list__item-marker',
		'attribute'=>'class',
		'default'=>'wp-block-catpow-t-list__item-marker has-font-weight-regular'
	],
	'markerIndexSize'=>['type'=>'string','default'=>'1em'],
	'markerIndexPad'=>['type'=>'number','default'=>1],
	'markerAlign'=>['source'=>'attribute','selector'=>'.wp-block-catpow-t-list__item-marker','attribute'=>'align','default'=>'left'],
	'prefix'=>['source'=>'html','selector'=>'.wp-block-catpow-t-list__item-marker-prefix','default'=>'●'],
	'sufix'=>['source'=>'html','selector'=>'.wp-block-catpow-t-list__item-marker-suffix','default'=>''],
	'items'=>[
		'source'=>'query',
		'selector'=>'.wp-block-catpow-t-list__item',
		'query'=>['text'=>['source'=>'html','selector'=>'.wp-block-catpow-t-list__item-text']],
		'default'=>[
			['text'=>'Item 1'],
			['text'=>'Item 2'],
			['text'=>'Item 3']
		]
	]
];
