<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-showcase',"attribute"=>'class',"default"=>'wp-block-catpow-showcase　medium hasTitleCaption hasCounter hasLink'],
	'vars'=>['type'=>'object'],
	
	'TitleTag'=>['type'=>'string','default'=>'h3'],
	
	"items"=>[
		"source"=>'query',
		"selector"=>'.item',
		'filters'=>[
			'eventDispatcher'=>['selector'=>'.link']
		],
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"title"=>["source"=>'html',"selector"=>'.title'],
			"titleCaption"=>["source"=>'html',"selector"=>'.titleCaption'],

			"src"=>["source"=>'attribute',"selector"=>'.image [src]',"attribute"=>'src'],
			"alt"=>["source"=>'attribute',"selector"=>'.image [src]',"attribute"=>'alt'],
			"imageCode"=>["source"=>'text',"selector"=>'.image'],

			"text"=>["source"=>'html',"selector"=>'.text'],
			"linkText"=>["source"=>'html',"selector"=>'.link'],
			"linkUrl"=>["source"=>'attribute',"selector"=>'.link',"attribute"=>'href'],

			"itemBackgroundImageSrc"=>["source"=>'attribute',"selector"=>'.itemBackground [src]',"attribute"=>'src',"default"=>cp::get_file_url('/images/dummy_bg.jpg')],
			"itemBackgroundImageSrcset"=>["source"=>'attribute',"selector"=>'.itemBackground [src]',"attribute"=>'srcset'],
			"itemBackgroundImageCode"=>["source"=>'text',"selector"=>'.itemBackground'],
		],
		"default"=>array_map(function(){
			return [
				"classes"=>'item',
				"title"=>'Title',
				"titleCaption"=>'Caption',
				"src"=>cp::get_file_url('/images/dummy.jpg'),
				"alt"=>'dummy',
				"text"=>'Text',
				"linkText"=>'Read More',
				"linkUrl"=>home_url()
			];
		},range(0,3))
	],
	"countPrefix"=>["source"=>'text',"selector"=>'.counter .prefix',"default"=>''],
	"countSuffix"=>["source"=>'text',"selector"=>'.counter .suffix',"default"=>''],
	"loopParam"=>["type"=>'string',"default"=>''],
	"loopCount"=>["type"=>'number',"default"=>1],

	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];