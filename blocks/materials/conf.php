<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-materials',"attribute"=>'class',"default"=>'wp-block-catpow-materials'],
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item.group',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"label"=>["source"=>'children',"selector"=>'.label'],
			"items"=>[
				"source"=>'query',
				"selector"=>'li.item',
				"query"=>[
					"classes"=>["source"=>'attribute',"attribute"=>'class'],
					"title"=>["source"=>'children',"selector"=>'.title'],
					"caption"=>["source"=>'children',"selector"=>'.caption'],
					"amount"=>["source"=>'children',"selector"=>'.amount'],
				]
			]
		],
		"default"=>array_map(function($label){
			return [
				"classes"=>'item group'.($label?' hasLabel':''),
				"label"=>$label,
				"items"=>array_map(function($i){
					return [
						"classes"=>'item',
						'title'=>['item'.$i],
						"caption"=>['caption'],
						"amount"=>['0'],
					];
				},range(0,3))
			];
		},['','A','B','C'])
	],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];