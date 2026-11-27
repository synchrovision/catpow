<?php
$attributes=[
	'classes'=>['source'=>'attribute','selector'=>'table','attribute'=>'class','default'=>'wp-block-catpow-simpletable is-level3 is-type-spec'],
	'vars'=>['type'=>'object'],
	'rows'=>[
		'source'=>'query',
		'selector'=>'table tr',
		'query'=>[
			'classes'=>['source'=>'attribute','attribute'=>'class'],
			'cond'=>['source'=>'attribute','attribute'=>'data-refine-cond'],
			'cells'=>[
				'source'=>'query',
				'selector'=>'th,td',
				'query'=>['text'=>['source'=>'html'],'classes'=>['source'=>'attribute','attribute'=>'class'],'style'=>['source'=>'attribute','attribute'=>'style']]
			]
		],
		'default'=>array_fill(0,3,[
			'classes'=>'wp-block-catpow-simpletable__tbody-tr',
			'cells'=>[
				['text'=>['Title'],'classes'=>''],
				['text'=>['Content'],'classes'=>'']
			]
		])
	],
	'blockState'=>['type'=>'object','default'=>['enableBlockFormat'=>true]]
];
