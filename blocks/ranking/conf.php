<?php

$theme_url=get_stylesheet_directory_uri();
$block_class='wp-block-catpow-ranking';

$attributes=[
	'version'=>['type'=>'number','default'=>0],
	'classes'=>[
		'source'=>'attribute',
		'selector'=>'.'.$block_class,
		'attribute'=>'class',
		'default'=>$block_class.' is-level3 has-content-width has-item-size-medium is-type-card has-rank has-rate'
	],
	'contentsClasses'=>['source'=>'attribute','selector'=>'.'.$block_class.'__item-contents','attribute'=>'class','default'=>$block_class.'__item-contents is-level4'],
	'vars'=>['type'=>'object'],
	'HeadingTag'=>['type'=>'string','default'=>'h3'],
	'SubHeadingTag'=>['type'=>'string','default'=>'h4'],
	'items'=>[
		'source'=>'query',
		'selector'=>'.'.$block_class.'__item',
		'query'=>[
			'classes'=>['source'=>'attribute','attribute'=>'class'],
			'title'=>['source'=>'html','selector'=>'.'.$block_class.'__item-header-text-title'],
			'titleCaption'=>['source'=>'html','selector'=>'.'.$block_class.'__item-header-text-caption'],
			'rate'=>['source'=>'attribute','attribute'=>'value','selector'=>'.'.$block_class.'__item-header-rate-data'],
			'src'=>['source'=>'attribute','selector'=>'.'.$block_class.'__item-image [src]','attribute'=>'src'],
			'alt'=>['source'=>'attribute','selector'=>'.'.$block_class.'__item-image [src]','attribute'=>'alt'],
			'lead'=>['source'=>'html','selector'=>'.'.$block_class.'__item-contents-lead'],
			'text'=>['source'=>'html','selector'=>'.'.$block_class.'__item-contents-text'],
			'linkUrl'=>['source'=>'attribute','selector'=>'.'.$block_class.'__item-contents-link','attribute'=>'href'],
			'linkText'=>['source'=>'text','selector'=>'.'.$block_class.'__item-contents-link']
		],
		'default'=>array_fill(0,3,[
			'classes'=>$block_class.'__item',
			'title'=>['Title'],
			'titleCaption'=>['Caption'],
			'rate'=>3,
			'lead'=>['Lead'],
			'src'=>$theme_url.'/images/dummy.jpg',
			'alt'=>'dummy',
			'text'=>['Text'],
			'linkUrl'=>home_url(),
			'linkText'=>'Read More'
		])
	],
	'rankPrefix'=>['source'=>'text','selector'=>'.'.$block_class.'__item-header-rank-prefix','default'=>__('第','catpow')],
	'rankStart'=>['source'=>'attribute','attribute'=>'value','selector'=>'.'.$block_class.'__item-header-rank-number','default'=>'1'],
	'rankSuffix'=>['source'=>'text','selector'=>'.'.$block_class.'__item-header-rank-suffix','default'=>__('位','catpow')],
	'rateLabel'=>['source'=>'text','selector'=>'.'.$block_class.'__item-header-rate-label','default'=>__('評価','catpow')]
];
