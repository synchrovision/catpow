<?php
$attributes=[
	"classes"=>["source"=>'attribute',"attribute"=>'class','selector'=>'.wp-block-catpow-slidablemenu',"default"=>'wp-block-catpow-slidablemenu medium'],
	
	'TitleTag'=>['type'=>'string','default'=>'h4'],
	
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"title"=>["source"=>'html',"selector"=>'.texts .title'],
			"text"=>["source"=>'html',"selector"=>'.texts .text'],

			"src"=>["source"=>'attribute',"selector"=>'.image [src]',"attribute"=>'src'],
			"alt"=>["source"=>'attribute',"selector"=>'.image [src]',"attribute"=>'alt'],
			"imageCode"=>["source"=>'text',"selector"=>'.image'],

			"linkUrl"=>["source"=>'attribute',"selector"=>'.link',"attribute"=>'href'],

		],
		"default"=>array_map(function(){
			return [
				"classes"=>'item',
				"title"=>['Title'],
				"text"=>['Text'],
				"src"=>cp::get_file_url('/images/dummy.jpg'),
				"alt"=>'dummy',
				"linkUrl"=>home_url()
			];
		},range(0,11))
	],
	"columnsCount"=>["type"=>'number',"default"=>4],
	"loopParam"=>["type"=>'string',"default"=>''],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];