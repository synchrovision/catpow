<?php

$theme_url=get_stylesheet_directory_uri();

$attributes=[
	'isTemplate'=>['type'=>'boolean','default'=>false],
	'version'=>['type'=>'number','default'=>0],
	'classes'=>['source'=>'attribute','selector'=>'ul','attribute'=>'class','default'=>'wp-block-catpow-flow is-type-flat has-counter'],
	'vars'=>['type'=>'object','default'=>(object)[]],
	'HeadingTag'=>['type'=>'string','default'=>'h3'],
	'SubHeadingTag'=>['type'=>'string','default'=>'h4'],
	'items'=>[
		'source'=>'query',
		'selector'=>'.wp-block-catpow-flow__item',
		'query'=>[
			'classes'=>['source'=>'attribute','attribute'=>'class'],
			'title'=>['source'=>'html','selector'=>'.wp-block-catpow-flow__item-texts-header-text-title'],
			'titleCaption'=>['source'=>'html','selector'=>' .wp-block-catpow-flow__item-texts-header-text-caption'],
			'src'=>['source'=>'attribute','selector'=>'.wp-block-catpow-flow__item-image [src]','attribute'=>'src'],
			'alt'=>['source'=>'attribute','selector'=>'.wp-block-catpow-flow__item-image [src]','attribute'=>'alt'],
			'subTitle'=>['source'=>'html','selector'=>'.wp-block-catpow-flow__item-texts-contents-subtitle'],
			'text'=>['source'=>'html','selector'=>'.wp-block-catpow-flow__item-texts-contents-text'],
			'linkUrl'=>['source'=>'attribute','selector'=>'.wp-block-catpow-flow__item-link','attribute'=>'href']
		],
		'default'=>array_fill(0,3,[
			'classes'=>'wp-block-catpow-flow__item',
			'title'=>['Title'],
			'titleCaption'=>['Caption'],
			'subTitle'=>['SubTitle'],
			'src'=>$theme_url.'/images/dummy.jpg',
			'alt'=>'dummy',
			'text'=>['Text'],
			'linkUrl'=>home_url()
		])
	],
	'countPrefix'=>['source'=>'text','selector'=>'.wp-block-catpow-flow__item-texts-header-counter-prefix','default'=>''],
	'countSuffix'=>['source'=>'text','selector'=>'.wp-block-catpow-flow__item-texts-header-counter-suffix','default'=>''],
	'contentsClasses'=>[
		'source'=>'attribute',
		'selector'=>'.wp-block-catpow-flow__item-texts-contents',
		'attribute'=>'class',
		'default'=>'wp-block-catpow-flow__item-texts-contents is-level4'
	]
];
