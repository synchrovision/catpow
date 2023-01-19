<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'ul',"attribute"=>'class',"default"=>'wp-block-catpow-listed menu medium hasHeader hasTitle hasTitleCaption hasImage hasText'],
	
	'TitleTag'=>['type'=>'string','default'=>'h3'],
	'SubTitleTag'=>['type'=>'string','default'=>'h4'],
	
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"title"=>["source"=>'html',"selector"=>'header .text h3,.header .text .title'],
			"titleCaption"=>["source"=>'html',"selector"=>'header .text p,.header .text .titlecaption'],

			"headerImageSrc"=>["source"=>'attribute',"selector"=>'header .image [src]',"attribute"=>'src'],
			"headerImageAlt"=>["source"=>'attribute',"selector"=>'header .image [src]',"attribute"=>'alt'],
			"headerImageCode"=>["source"=>'text',"selector"=>'header .image'],

			"subImageSrc"=>["source"=>'attribute',"selector"=>'.contents .image [src]',"attribute"=>'src'],
			"subImageAlt"=>["source"=>'attribute',"selector"=>'.contents .image [src]',"attribute"=>'alt'],
			"subImageCode"=>["source"=>'text',"selector"=>'.contents .image'],

			"src"=>["source"=>'attribute',"selector"=>'li>.image [src]',"attribute"=>'src'],
			"alt"=>["source"=>'attribute',"selector"=>'li>.image [src]',"attribute"=>'alt'],
			"imageCode"=>["source"=>'text',"selector"=>'li>.image'],

			"subTitle"=>["source"=>'html',"selector"=>'.contents h4,.contents .subtitle'],
			"text"=>["source"=>'html',"selector"=>'.contents p','.contents .text'],
			"linkUrl"=>["source"=>'attribute',"selector"=>'.link a',"attribute"=>'href'],

			"backgroundImageSrc"=>["source"=>'attribute',"selector"=>'.background [src]',"attribute"=>'src',"default"=>cp::get_file_url('/images/dummy_bg.jpg')],
			"backgroundImageSrcset"=>["source"=>'attribute',"selector"=>'.background [src]',"attribute"=>'srcset'],
			"backgroundImageCode"=>["source"=>'text',"selector"=>'.background'],
		],
		"default"=>array_map(function(){
			return [
				"classes"=>'item',
				"title"=>['Title'],
				"titleCaption"=>['Caption'],
				"headerImageSrc"=>cp::get_file_url('/images/dummy.jpg'),
				"headerImageAlt"=>'dummy',
				"subTitle"=>['SubTitle'],
				"src"=>cp::get_file_url('/images/dummy.jpg'),
				"alt"=>'dummy',
				"text"=>['Text'],
				"linkUrl"=>home_url()
			];
		},range(0,3))
	],
	"countPrefix"=>["source"=>'text',"selector"=>'.counter .prefix',"default"=>''],
	"countSuffix"=>["source"=>'text',"selector"=>'.counter .suffix',"default"=>''],
	"subCountPrefix"=>["source"=>'text',"selector"=>'.subcounter .prefix',"default"=>''],
	"subCountSuffix"=>["source"=>'text',"selector"=>'.subcounter .suffix',"default"=>''],
	"loopParam"=>["type"=>'string',"default"=>''],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];