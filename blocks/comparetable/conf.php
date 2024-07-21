<?php
$attributes=[
	'classes'=>['type'=>'text','default'=>'is-style-spec has-tags has-header-column'],
	'vars'=>['type'=>'object','default'=>['--cp-table-width'=>'960','--cp-column-width'=>'200','--cp-header-column-width'=>'120']],
	
	'headerColClasses'=>['source'=>'attribute','attribute'=>'data-header-col-class','selector'=>'.wp-block-catpow-comparetable','default'=>'has-text-align-center has-vertical-align-middle'],
	'firstCellClasses'=>['source'=>'attribute','attribute'=>'data-first-cell-class','selector'=>'.wp-block-catpow-comparetable','default'=>'is-spacer'],
	'cols'=>[
		'source'=>'query',
		'selector'=>'table col',
		'query'=>[
			'classes'=>['source'=>'attribute','attribute'=>'data-col-class'],
		],
		'default'=>[
			['classes'=>'has-font-size-medium'],
			['classes'=>'has-font-size-large is-image'],
			['classes'=>'has-font-size-large'],
			['classes'=>'has-font-size-medium'],
			['classes'=>'has-font-size-small'],
		]
	],
	'rows'=>[
		'source'=>'query',
		'selector'=>'table tr',
		'query'=>[
			'classes'=>['source'=>'attribute','attribute'=>'data-row-class'],
			'cells'=>[
				'source'=>'query',
				'selector'=>'th,td',
				'query'=>[
					'text'=>['source'=>'html','selector'=>'[data-role="contents"]'],
					'classes'=>['source'=>'attribute','attribute'=>'data-cell-class'],
					'style'=>['source'=>'attribute','attribute'=>'style'],
					'label'=>['source'=>'html','selector'=>'[data-role="label"]'],
					'src'=>['source'=>'attribute','selector'=>'[data-role="image"] [src]','attribute'=>'src'],
					'alt'=>['source'=>'attribute','selector'=>'[data-role="image"] [src]','attribute'=>'alt'],
					'imageCode'=>['source'=>'text','selector'=>'[data-role="image"]'],
				]
			]
		],
		'default'=>[
			['classes'=>'is-standard','cells'=>[
				['text'=>[''],'classes'=>''],
				['text'=>['Image'],'classes'=>''],
				['text'=>['Large'],'classes'=>''],
				['text'=>['Medium'],'classes'=>''],
				['text'=>['Small'],'classes'=>'']
			]],
			['classes'=>'is-premium','cells'=>[
				['text'=>['Premium'],'classes'=>'has-label','label'=>'PREMIUM'],
				['text'=>['Content'],'classes'=>''],
				['text'=>['Content'],'classes'=>''],
				['text'=>['Content'],'classes'=>''],
				['text'=>['Content'],'classes'=>'']
			]],
			['classes'=>'is-recommended','cells'=>[
				['text'=>['Recommended'],'classes'=>''],
				['text'=>['Content'],'classes'=>''],
				['text'=>['Content'],'classes'=>''],
				['text'=>['Content'],'classes'=>''],
				['text'=>['Content'],'classes'=>'']
			]],
			['classes'=>'is-deprecated','cells'=>[
				['text'=>['Deprecated'],'classes'=>''],
				['text'=>['Standard'],'classes'=>''],
				['text'=>['Premium'],'classes'=>''],
				['text'=>['Recommended'],'classes'=>''],
				['text'=>['Deprecated'],'classes'=>'']
			]]
		]
	],
	'file'=>['type'=>'object'],
	'blockState'=>['type'=>'object','default'=>['enableBlockFormat'=>true]],
	'loopParam'=>['type'=>'string','default'=>''],
	'loopCount'=>['type'=>'number','default'=>1],
	
	'doLoop'=>['type'=>'boolean','default'=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];