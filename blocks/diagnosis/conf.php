<?php
namespace Catpow;
use Catpow\util\BlockConfig;
$attributes=[
	'classes'=>['type'=>'text','default'=>'has-count do-send-event'],
	
	'flags'=>['type'=>'array','default'=>['yes'=>'はい','no'=>'いいえ']],
	'scoreColumns'=>['type'=>'array'],
	
	'numSteps'=>['type'=>'number','default'=>3],
	
	"countPrefix"=>["source"=>'text',"selector"=>'[data-role="count-prefix"]',"default"=>'Q'],
	"countSuffix"=>["source"=>'text',"selector"=>'[data-role="count-suffix"]',"default"=>'.'],
	'sections'=>[
		'source'=>'query',
		'selector'=>'[data-role="section"]',
		'query'=>[
			'classes'=>['source'=>'attribute','attribute'=>'data-section-class'],
			'id'=>['source'=>'attribute','attribute'=>'data-section-id'],
			'step'=>['source'=>'attribute','attribute'=>'data-step'],
			'cond'=>['source'=>'attribute','attribute'=>'data-cond'],
			'title'=>['source'=>'html','selector'=>'[data-role="title"]'],
			'lead'=>['source'=>'html','selector'=>'[data-role="lead"]'],
			'desc'=>['source'=>'html','selector'=>'[data-role="desc"]'],
			"sources"=>BlockConfig::getPictureSoucesAttributesForDevices(['sp','tb'],'[data-role="image"]'),
			'src'=>['source'=>'attribute','attribute'=>'src','selector'=>'[data-role="image"] img'],
			'alt'=>['source'=>'attribute','attribute'=>'alt','selector'=>'[data-role="image"] img'],
			'buttons'=>[
				'source'=>'query',
				'selector'=>'[data-role="button"]',
				'query'=>[
					'classes'=>['source'=>'attribute','attribute'=>'data-button-class'],
					'id'=>['source'=>'attribute','attribute'=>'data-button-id'],
					'text'=>['source'=>'html'],
					'flag'=>['source'=>'attribute','attribute'=>'data-flag'],
					'score'=>['source'=>'attribute','attribute'=>'data-score'],
					'href'=>['source'=>'attribute','attribute'=>'href']
				]
			]
		],
		'default'=>array_merge(
			[
				[
					'classes'=>'is-section-start has-lead has-desc has-image has-large-image',
					'id'=>uniqid(),
					'step'=>0,
					'title'=>_('診断ブロック'),
					'lead'=>_('質問に答えて簡単診断'),
					'desc'=>_('簡易な診断アプリのブロックです'),
					"sources"=>BlockConfig::getPictureSoucesAttributesDefaultValueForDevices(['sp','tb']),
					'src'=>cp::get_file_url('/images/dummy.jpg'),
					'alt'=>_('イメージ画像'),
					'buttons'=>[
						[
							'classes'=>'',
							'id'=>uniqid(),
							'text'=>'診断開始'
						]
					]
				]
			],
			array_map(function($i){
				$step=ceil($i/2);
				$index=($i&1)+1;
				return [
					'classes'=>'is-section-question has-lead has-desc has-image has-medium-image',
					'id'=>uniqid(),
					'step'=>$step,
					'cond'=>($index===1)?'yes':'',
					'title'=>_('設問内容'),
					'lead'=>_('リード文'),
					'desc'=>_('説明文'),
					"sources"=>BlockConfig::getPictureSoucesAttributesDefaultValueForDevices(['sp','tb']),
					'src'=>cp::get_file_url('/images/dummy.jpg'),
					'alt'=>_('イメージ画像'),
					'buttons'=>[
						[
							'classes'=>'',
							'id'=>uniqid(),
							'text'=>'はい',
							'flag'=>'yes',
							'score'=>'yes:1',
						],
						[
							'classes'=>'',
							'id'=>uniqid(),
							'text'=>'いいえ',
							'flag'=>'!yes',
							'score'=>'no:1',
						]
					]
				];
			},range(1,6)),
			array_map(function($i){
				return [
					'classes'=>'is-section-result has-lead has-desc has-image has-large-image',
					'id'=>uniqid(),
					'step'=>4,
					'cond'=>'no<'.$i,
					'title'=>_('診断結果'.$i),
					'lead'=>_('リード文'),
					'desc'=>_('説明文'),
					"sources"=>BlockConfig::getPictureSoucesAttributesDefaultValueForDevices(['sp','tb']),
					'src'=>cp::get_file_url('/images/dummy.jpg'),
					'alt'=>_('イメージ画像'),
					'buttons'=>[
						[
							'classes'=>'',
							'id'=>uniqid(),
							'text'=>'リンク',
							'href'=>'https://example.com',
						]
					]
				];
			},range(1,3))
		)
	]
];