<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'ul',"attribute"=>'class',"default"=>'wp-block-catpow-dialog'],
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"title"=>["source"=>'html',"selector"=>'header .text h3'],
			"headerImageSrc"=>["source"=>'attribute',"selector"=>'header .image [src]',"attribute"=>'src'],
			"headerImageAlt"=>["source"=>'attribute',"selector"=>'header .image [src]',"attribute"=>'alt'],
			"text"=>["source"=>'html',"selector"=>'.contents p']
		],
		"default"=>array_map(function(){
			return [
				"classes"=>'item left',
				"title"=>['Title'],
				"titleCaption"=>['Caption'],
				"headerImageSrc"=>cp::get_file_url('/images/dummy.jpg'),
				"headerImageAlt"=>'dummy',
				"text"=>['Text']
			];
		},range(0,3))
	],
	"loopParam"=>["type"=>'text'],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];