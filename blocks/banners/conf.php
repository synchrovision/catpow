<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'ul',"attribute"=>'class',"default"=>'wp-block-catpow-banners medium hasTitle'],
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"title"=>["source"=>'children',"selector"=>'h3'],
			"src"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'src'],
			"srcset"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'srcset'],
			"alt"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'alt'],
			"imageCode"=>["source"=>'text',"selector"=>'a'],
			"linkUrl"=>["source"=>'attribute',"selector"=>'a',"attribute"=>'href'],
			"target"=>["source"=>'attribute',"selector"=>'a',"attribute"=>'target'],
			"event"=>["source"=>'attribute',"selector"=>'a',"attribute"=>'data-event']
		],
		"default"=>array_map(function(){
			return [
				"classes"=>'item',
				"title"=>['Title'],
				"src"=>cp::get_file_url('/images/dummy.jpg'),
				"alt"=>'dummy',
				"linkUrl"=>home_url(),
				"imageCode"=>'[output image]'
			];
		},range(0,3))
	],
	"loopParam"=>["type"=>'text',"default"=>''],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];