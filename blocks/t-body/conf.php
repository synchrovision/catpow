<?php
add_filter('wp_kses_allowed_html',function($allowedposttags){
	$allowedposttags['textmail']=[];
	return $allowedposttags;
});
$attributes=[
	'type'=>['type'=>'string','default'=>'plain'],
	'isHtmlMail'=>['type'=>'boolean','default'=>false],
	'classes'=>['source'=>'attribute','selector'=>'table','attribute'=>'class','default'=>'wp-block-catpow-t-body has-header has-footer'],
	'headerClasses'=>['source'=>'attribute','selector'=>'thead','attribute'=>'class','default'=>'wp-block-catpow-t-body__thead has-color-scheme-inverted has-background-color'],
	'footerClasses'=>['source'=>'attribute','selector'=>'tfoot','attribute'=>'class','default'=>'wp-block-catpow-t-body__tfoot has-background-color-alt'],
	'headerText'=>['source'=>'html','selector'=>'thead th.is-text-cell','default'=>'Title'],
	'headerPaddingTop'=>['type'=>'number','default'=>1],
	'headerPaddingBottom'=>['type'=>'number','default'=>1],
	'footerText'=>['source'=>'html','selector'=>'tfoot td.is-text-cell','default'=>'caption'],
	'footerPaddingTop'=>['type'=>'number','default'=>1],
	'footerPaddingBottom'=>['type'=>'number','default'=>1],
	'body_class'=>['type'=>'string','default'=>'has-bg-white'],
	'textMail'=>['source'=>'text','selector'=>'textmail']
];
