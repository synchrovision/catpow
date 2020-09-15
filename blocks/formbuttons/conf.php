<?php
$attributes=[
	'className'=>['type'=>'string'],
	'classes'=>['source'=>'attribute','selector'=>'ul','attribute'=>'class','default'=>'wp-block-catpow-formbuttons buttons m'],
	'items'=>[
		'source'=>'query',
		'selector'=>'li.item',
		'query'=>[
			'classes'=>['source'=>'attribute','attribute'=>'class'],
			'event'=>['source'=>'attribute','selector'=>'.button','attribute'=>'data-event'],
			'action'=>['source'=>'attribute','selector'=>'.button','attribute'=>'data-action'],
			'target'=>['source'=>'attribute','selector'=>'.button','attribute'=>'data-target'],
			'ignoreMessage'=>['source'=>'attribute','selector'=>'.button','attribute'=>'ignore-message'],
			'text'=>['source'=>'text','selector'=>'.button'],
			'iconSrc'=>['source'=>'attribute','selector'=>'.icon img','attribute'=>'src'],
			'iconAlt'=>['source'=>'attribute','selector'=>'.icon img','attribute'=>'alt'],
		],
		'default'=>[
			['classes'=>'item','action'=>'send','text'=>'送信']
		]
	]
];