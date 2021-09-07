<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-definition',"attribute"=>'class',"default"=>'wp-block-catpow-definition'],
	
	"items"=>[
		"source"=>'query',
		"selector"=>'dl.item',
		"query"=>[
			"title"=>["source"=>'children',"selector"=>'dt'],
			"text"=>["source"=>'children',"selector"=>'dd'],
		],
		"default"=>array_map(function(){
			return [
				"title"=>['Title'],
				"text"=>['Text']
			];
		},range(0,3))
	],
	"loopParam"=>["type"=>'text',"default"=>''],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];