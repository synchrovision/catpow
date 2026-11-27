<?php

$theme_url=get_stylesheet_directory_uri();

$attributes=[
	'isTemplate'=>['type'=>'boolean','default'=>false],
	'classes'=>['source'=>'attribute','selector'=>'table','attribute'=>'class','default'=>'wp-block-catpow-t-media-text has-vertical-align-top has-image-left'],
	'src'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'src','default'=>$theme_url.'/images/dummy.jpg'],
	'alt'=>['source'=>'attribute','selector'=>'[src]','attribute'=>'alt'],
	'imageCode'=>['source'=>'text','selector'=>'td.is-image-cell','default'=>$theme_url.'/images/dummy.jpg'],
	'width'=>['source'=>'attribute','selector'=>'td.is-image-cell','attribute'=>'width','default'=>'200'],
	'gap'=>['source'=>'attribute','selector'=>'tr:has(td.is-image-cell) td.is-spacer-cell','attribute'=>'width','default'=>'20'],
	'marginTop'=>['type'=>'number','default'=>1],
	'marginBottom'=>['type'=>'number','default'=>1]
];
