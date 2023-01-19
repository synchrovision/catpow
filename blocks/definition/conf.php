<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-definition',"attribute"=>'class',"default"=>'wp-block-catpow-definition'],
	
	"items"=>[
		"source"=>'query',
		"selector"=>'dl.item',
		"query"=>[
			"title"=>["source"=>'html',"selector"=>'dt'],
			"text"=>["source"=>'html',"selector"=>'dd'],
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