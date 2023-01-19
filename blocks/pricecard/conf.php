<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'ul',"attribute"=>'class',"default"=>'wp-block-catpow-pricecard hasImage hasTitle hasSpec unitBefore'],
	"priceUnit"=>["source"=>'text',"selector"=>'span.price .unit',"default"=>'¥'],
	"priceCaption"=>["source"=>'html',"selector"=>'span.priceCaption',"default"=>['（税込）']],
	"linkText"=>["source"=>'text',"selector"=>'.link',"default"=>'more info'],
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"title"=>["source"=>'html',"selector"=>'header .text h3'],
			"titleCaption"=>["source"=>'html',"selector"=>'header .text p'],
			"src"=>["source"=>'attribute',"selector"=>'li>.image [src]',"attribute"=>'src'],
			"alt"=>["source"=>'attribute',"selector"=>'li>.image [src]',"attribute"=>'alt'],
			"imageCode"=>["source"=>'text',"selector"=>'li>.image'],
			"subTitle"=>["source"=>'html',"selector"=>'.contents h4'],
			"text"=>["source"=>'html',"selector"=>'.contents p'],
			"listPrice"=>["source"=>'text',"selector"=>'span.listPrice .number'],
			"price"=>["source"=>'text',"selector"=>'span.price .number'],

			"specLabels"=>["source"=>'query',"selector"=>'dl.spec dt',"query"=>["text"=>["source"=>'html']]],
			"specValues"=>["source"=>'query',"selector"=>'dl.spec dd',"query"=>["text"=>["source"=>'html']]],
			"linkUrl"=>["source"=>'attribute',"selector"=>'.link',"attribute"=>'href'],
		],
		"default"=>array_map(function(){
			return [
				"classes"=>'item',
				"title"=>['Title'],
				"titleCaption"=>['Caption'],
				"src"=>cp::get_file_url('/images/dummy.jpg'),
				"alt"=>'dummy',
				"subTitle"=>['SubTitle'],
				"text"=>['Text'],
				"listPrice"=>'0,000',
				"price"=>'0,000',
				"specLabels"=>array_map(function(){return ["text"=>['label']];},range(0,3)),
				"specValues"=>array_map(function(){return ["text"=>['value']];},range(0,3)),
				"linkUrl"=>home_url()
			];
		},range(0,3))
	],
	"loopParam"=>["type"=>'text',"default"=>''],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];