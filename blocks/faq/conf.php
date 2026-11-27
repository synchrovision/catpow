<?php

$theme_url=get_stylesheet_directory_uri();

$attributes=[
	'version'=>['type'=>'number','default'=>0],
	'classes'=>['source'=>'attribute','selector'=>'ul','attribute'=>'class','default'=>'wp-block-catpow-faq is-level3'],
	'vars'=>['type'=>'object'],
	'items'=>[
		'source'=>'query',
		'selector'=>'.wp-block-catpow-faq__item',
		'query'=>[
			'classes'=>['source'=>'attribute','attribute'=>'class'],
			'src'=>['source'=>'attribute','selector'=>'.wp-block-catpow-faq__item-header-image [src]','attribute'=>'src'],
			'alt'=>['source'=>'attribute','selector'=>'.wp-block-catpow-faq__item-header-image [src]','attribute'=>'alt'],
			'title'=>['source'=>'html','selector'=>'.wp-block-catpow-faq__item-header-text-title'],
			'titleCaption'=>['source'=>'html','selector'=>'.wp-block-catpow-faq__item-header-text-caption'],
			'subTitle'=>['source'=>'html','selector'=>'.wp-block-catpow-faq__item-contents-body-subtitle'],
			'text'=>['source'=>'html','selector'=>'.wp-block-catpow-faq__item-contents-body-text']
		],
		'default'=>array_fill(0,3,[
			'classes'=>'wp-block-catpow-faq__item',
			'title'=>['Title'],
			'titleCaption'=>['Caption'],
			'subTitle'=>['SubTitle'],
			'src'=>$theme_url.'/images/dummy.jpg',
			'alt'=>'dummy',
			'text'=>['Text']
		])
	],
	'counterPrefix'=>['source'=>'text','selector'=>'.wp-block-catpow-faq__item-header-counter-prefix','default'=>''],
	'counterSuffix'=>['source'=>'text','selector'=>'.wp-block-catpow-faq__item-header-counter-suffix','default'=>'']
];
