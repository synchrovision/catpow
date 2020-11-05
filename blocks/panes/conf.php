<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'ul',"attribute"=>'class',"default"=>'wp-block-catpow-panes'],
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"title"=>["source"=>'children',"selector"=>'.contents .text h3'],
			"titleCaption"=>["source"=>'children',"selector"=>'.contents .text p'],

			"src"=>["source"=>'attribute',"selector"=>'li>.image [src]',"attribute"=>'src'],
			"alt"=>["source"=>'attribute',"selector"=>'li>.image [src]',"attribute"=>'alt'],
			"imageCode"=>["source"=>'text',"selector"=>'li>.image'],
			
			"symbolSrc"=>["source"=>'attribute',"selector"=>'li>.contents .symbol [src]',"attribute"=>'src'],
			"symbolAlt"=>["source"=>'attribute',"selector"=>'li>.contents .symbol [src]',"attribute"=>'alt'],
			"symbolCode"=>["source"=>'text',"selector"=>'li>.contents .symbol'],

			"linkUrl"=>["source"=>'attribute',"selector"=>'.link a',"attribute"=>'href'],
		],
		"default"=>array_map(function(){
			return [
				"classes"=>'item',
				"title"=>['Title'],
				"titleCaption"=>['Caption'],
				"src"=>cp::get_file_url('/images/dummy.jpg'),
				"alt"=>'dummy',
				"linkUrl"=>home_url()
			];
		},range(0,3))
	],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];