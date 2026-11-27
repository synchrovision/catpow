<?php
$attributes=[
	'classes'=>['source'=>'attribute','selector'=>'.wp-block-catpow-aquarium','attribute'=>'class','default'=>'wp-block-catpow-aquarium'],
	'layers'=>[
		'source'=>'query',
		'selector'=>'.layer',
		'query'=>[
			'classes'=>['source'=>'attribute','attribute'=>'class'],
			'items'=>[
				'source'=>'query',
				'selector'=>'.item',
				'query'=>[
					'classes'=>['source'=>'attribute','attribute'=>'class'],
					'images'=>[
						'source'=>'query',
						'selector'=>'.image',
						'query'=>[
							'classes'=>['source'=>'attribute','attribute'=>'class'],
							'src'=>['source'=>'attribute','attribute'=>'src','selector'=>'img'],
							'srcset'=>['source'=>'attribute','attribute'=>'srcset','selector'=>'img'],
							'alt'=>['source'=>'attribute','attribute'=>'alt','selector'=>'img']
						]
					],
					'texts'=>[
						'source'=>'query',
						'selector'=>'.text',
						'query'=>['classes'=>['source'=>'attribute','attribute'=>'class'],'title'=>['source'=>'html','selector'=>'h3'],'text'=>['source'=>'html','selector'=>'p']]
					]
				]
			]
		],
		'default'=>[
			[
				'classes'=>'layer h_120',
				'items'=>[
					[
						'classes'=>'item center middle w_50 h_50 t_40 l_30',
						'images'=>[],
						'texts'=>[
							['classes'=>'text top left w_100 h_100 t_0 l_0 hasTitle hasText','title'=>'Title','text'=>'Text']
						]
					]
				]
			],
			[
				'classes'=>'layer h_160',
				'items'=>[
					[
						'classes'=>'item center middle w_50 h_50 t_60 l_70',
						'images'=>[],
						'texts'=>[
							['classes'=>'text top left w_100 h_100 t_0 l_0 hasTitle hasText','title'=>'Title','text'=>'Text']
						]
					]
				]
			]
		]
	]
];
