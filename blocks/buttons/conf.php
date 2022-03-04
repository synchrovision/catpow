<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'ul',"attribute"=>'class',"default"=>'wp-block-catpow-buttons buttons m'],
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		'filters'=>[
			'iconHolder'=>['selector'=>'.icon'],
			'eventDispatcher'=>['selector'=>'.button']
		],
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"text"=>["source"=>'text',"selector"=>'.button'],
			"url"=>["source"=>'attribute',"selector"=>'.button',"attribute"=>'href'],
			"iconSrc"=>["source"=>'attribute',"selector"=>'.icon img',"attribute"=>'src'],
			"iconAlt"=>["source"=>'attribute',"selector"=>'.icon img',"attribute"=>'alt'],
		],
		"default"=>[
			["classes"=>'item mail default',"event"=>'',"text"=>'お問合せ',"url"=>'[home_url]/contact']
		]
	],
	"loopParam"=>["type"=>'text'],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];