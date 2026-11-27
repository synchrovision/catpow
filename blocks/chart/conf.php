<?php
$attributes=[
	'classes'=>['source'=>'attribute','selector'=>'div','attribute'=>'class','default'=>'wp-block-catpow-chart BarChart'],
	'graph'=>[
		'source'=>'query',
		'selector'=>'svg',
		'query'=>[
			'title'=>['source'=>'text','selector'=>'g.ChartText text.title'],
			'unit'=>['source'=>'text','selector'=>'g.ChartText text.unit'],
			'rowTitle'=>['source'=>'text','selector'=>'g.ChartText text.rowTitle'],
			'rowUnit'=>['source'=>'text','selector'=>'g.ChartText text.rowUnit'],
			'total'=>['source'=>'attribute','selector'=>'data-total'],
			'rows'=>[
				'source'=>'query',
				'selector'=>'g.graph g.row',
				'query'=>[
					'classes'=>['source'=>'attribute','attribute'=>'class'],
					'label'=>['source'=>'attribute','attribute'=>'data-label'],
					'vals'=>['source'=>'query','selector'=>'.val','query'=>['value'=>['source'=>'attribute','attribute'=>'data-value']]]
				]
			],
			'cols'=>[
				'source'=>'query',
				'selector'=>'g.graph g.col',
				'query'=>['classes'=>['source'=>'attribute','attribute'=>'class'],'label'=>['source'=>'attribute','attribute'=>'data-label']]
			]
		],
		'default'=>[
			[
				'title'=>__('ステータス','catpow'),
				'unit'=>'pt',
				'rowTitle'=>__('日数','catpow'),
				'rowUnit'=>__('日','catpow'),
				'rows'=>[
					[
						'classes'=>'row weak',
						'label'=>'1',
						'vals'=>[
							['value'=>30],
							['value'=>40],
							['value'=>40],
							['value'=>40],
							['value'=>40]
						]
					],
					[
						'classes'=>'row normal',
						'label'=>'2',
						'vals'=>[
							['value'=>40],
							['value'=>60],
							['value'=>30],
							['value'=>20],
							['value'=>50]
						]
					],
					[
						'classes'=>'row strong',
						'label'=>'3',
						'vals'=>[
							['value'=>50],
							['value'=>80],
							['value'=>20],
							['value'=>30],
							['value'=>60]
						]
					]
				],
				'cols'=>[
					['classes'=>'col color1','label'=>'VIT'],
					['classes'=>'col color2','label'=>'STR'],
					['classes'=>'col color3','label'=>'AGR'],
					['classes'=>'col color4','label'=>'INT'],
					['classes'=>'col color5','label'=>'MND']
				]
			]
		]
	]
];
