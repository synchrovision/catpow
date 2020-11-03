<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'ul',"attribute"=>'class',"default"=>'wp-block-catpow-materials'],
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"imageSrc"=>["source"=>'attribute',"selector"=>'.image [src]',"attribute"=>'src'],
			"imageAlt"=>["source"=>'attribute',"selector"=>'.image [src]',"attribute"=>'alt'],
			"imageCode"=>["source"=>'text',"selector"=>'.image'],
			"title"=>["source"=>'children',"selector"=>'.title'],
			"caption"=>["source"=>'children',"selector"=>'.caption'],
			"amount"=>["source"=>'children',"selector"=>'.amount'],
			"children"=>[
				"source"=>'query',
				"selector"=>'li.item',
				"query"=>[
					"classes"=>["source"=>'attribute',"attribute"=>'class'],
					"imageSrc"=>["source"=>'attribute',"selector"=>'.image [src]',"attribute"=>'src'],
					"imageAlt"=>["source"=>'attribute',"selector"=>'.image [src]',"attribute"=>'alt'],
					"imageCode"=>["source"=>'text',"selector"=>'.image'],
					"title"=>["source"=>'children',"selector"=>'.title'],
					"caption"=>["source"=>'children',"selector"=>'.caption'],
					"amount"=>["source"=>'children',"selector"=>'.amount'],
				]
			]
		],
		"default"=>array_map(function($i){
			return [
				"classes"=>'item hasCaption',
				"imageSrc"=>cp::get_file_url('/images/dummy.jpg'),
				"imageAlt"=>'dummy',
				"imageCode"=>'',
				"title"=>['Material'],
				"caption"=>['caption'],
				"amount"=>['0'],
			];
		},range(0,3))
	],
	"loopParam"=>["type"=>'text',"default"=>''],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];