<?php
$attributes=[
	'classes'=>['source'=>'attribute','selector'=>'div','attribute'=>'class','default'=>'wp-block-catpow-tabs is-level3 is-type-panel is-style-flat'],
	'HeadingTag'=>['type'=>'text','default'=>'h3'],
	'vars'=>['type'=>'object','default'=>(object)[]],
	'items'=>[
		'source'=>'query',
		'selector'=>'.wp-block-catpow-tabs__tab-item',
		'query'=>['title'=>['source'=>'html','selector'=>'.wp-block-catpow-tabs__tab-item-title']],
		'default'=>[
			['title'=>['Tab 1']],
			['title'=>['Tab 2']],
			['title'=>['Tab 3']]
		]
	]
];
