<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'ul',"attribute"=>'class',"default"=>'wp-block-catpow-buttons buttons m'],
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"event"=>["source"=>'attribute',"selector"=>'.button',"attribute"=>'data-event'],
			"text"=>["source"=>'text',"selector"=>'.button'],
			"url"=>["source"=>'attribute',"selector"=>'.button',"attribute"=>'href'],
			"iconSrc"=>["source"=>'attribute',"selector"=>'.icon img',"attribute"=>'src'],
			"iconAlt"=>["source"=>'attribute',"selector"=>'.icon img',"attribute"=>'alt'],
		],
		"default"=>[
			["classes"=>'item mail primary',"event"=>'',"text"=>'お問合せ',"url"=>'[home_url]/contact']
		]
	],
	"loopParam"=>["type"=>'text'],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];