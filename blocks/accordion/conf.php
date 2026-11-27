<?php

$theme_url=get_stylesheet_directory_uri();

$attributes=[
	'isTemplate'=>['type'=>'boolean','default'=>false],
	'vars'=>['type'=>'object','default'=>(object)[]],
	'classes'=>['source'=>'attribute','selector'=>'.wp-block-catpow-accordion','attribute'=>'class','default'=>'wp-block-catpow-accordion is-level3'],
	'HeadingTag'=>['type'=>'string','default'=>'h3'],
	'title'=>['source'=>'html','selector'=>'.wp-block-catpow-accordion__header-title','default'=>'Title'],
	'imageMime'=>['source'=>'attribute','selector'=>'.wp-block-catpow-accordion__header-image [src]','attribute'=>'data-mime'],
	'imageSrc'=>['source'=>'attribute','selector'=>'.wp-block-catpow-accordion__header-image [src]','attribute'=>'src','default'=>$theme_url.'/images/dummy.jpg'],
	'imageAlt'=>['source'=>'attribute','selector'=>'.wp-block-catpow-accordion__header-image [src]','attribute'=>'alt'],
	'imageCode'=>['source'=>'text','selector'=>'.wp-block-catpow-accordion__header-image']
];
