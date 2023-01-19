<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'ul',"attribute"=>'class',"default"=>'wp-block-catpow-lightbox medium hasTitle hasImage hasText hasHeaderImage'],
	"boxClasses"=>["source"=>'attribute',"selector"=>'.contents',"attribute"=>'class',"default"=>'contents'],
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"title"=>["source"=>'html',"selector"=>'header .text h3'],
			"titleCaption"=>["source"=>'html',"selector"=>'header .text p'],
			
			"headerImageSrc"=>["source"=>'attribute',"selector"=>'header .image [src]',"attribute"=>'src'],
			"headerImageAlt"=>["source"=>'attribute',"selector"=>'header .image [src]',"attribute"=>'alt'],
			"headerImageCode"=>["source"=>'text',"selector"=>'header .image'],
			
			"src"=>["source"=>'attribute',"selector"=>'.contents .image [src]',"attribute"=>'src'],
			"alt"=>["source"=>'attribute',"selector"=>'.contents .image [src]',"attribute"=>'alt'],
			"imageCode"=>["source"=>'text',"selector"=>'.contents .image'],
			
			"subTitle"=>["source"=>'html',"selector"=>'.contents .title h4'],
			"text"=>["source"=>'html',"selector"=>'.contents .text'],
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
			];
		},range(0,3))
	],
	"blockState"=>["type"=>'object',"default"=>["enableBlockFormat"=>false]],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];