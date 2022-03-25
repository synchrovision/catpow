<?php
$attributes=[
	'className'=>['type'=>'string'],
	'classes'=>['source'=>'attribute','selector'=>'ul','attribute'=>'class','default'=>'wp-block-catpow-formbuttons buttons m center'],
	'items'=>[
		'source'=>'query',
		'selector'=>'li.item',
		'filters'=>[
			'iconHolder'=>['selector'=>'.icon'],
			'eventDispatcher'=>['selector'=>'.button']
		],
		'query'=>[
			'classes'=>['source'=>'attribute','attribute'=>'class'],
			'action'=>['source'=>'attribute','selector'=>'.button','attribute'=>'data-action'],
			'callback'=>['source'=>'attribute','selector'=>'.button','attribute'=>'data-callback'],
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