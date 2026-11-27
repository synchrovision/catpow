<?php

$theme_url=get_stylesheet_directory_uri();

$attributes=[
	'classes'=>['source'=>'attribute','selector'=>'div','attribute'=>'class','default'=>'wp-block-catpow-sticky topLeft small label'],
	'labelText'=>['source'=>'html','selector'=>'.content>.label','defalt'=>__('ラベル','catpow')],
	'openButtonImageSrc'=>['source'=>'attribute','selector'=>'.wp-block-catpow-sticky>.stickyButton [src].open','attribute'=>'src','default'=>$theme_url.'/images/dummy_icon.svg'],
	'closeButtonImageSrc'=>['source'=>'attribute','selector'=>'.wp-block-catpow-sticky>.stickyButton [src].close','attribute'=>'src','default'=>$theme_url.'/images/dummy_icon.svg']
];
