<?php
$block_class='wp-block-catpow-buttons';
$buttons_class='cp-buttons';
$button_class='cp-button';
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>".{$block_class}","attribute"=>'class',"default"=>"{$block_class} {$buttons_class} m"],
	"items"=>[
		"source"=>'query',
		"selector"=>".{$block_class}__item",
		'filters'=>[
			'iconHolder'=>['selector'=>".{$block_class}-button__icon"],
			'eventDispatcher'=>['selector'=>".{$block_class}-button"]
		],
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"text"=>["source"=>'text',"selector"=>".{$block_class}-button"],
			"url"=>["source"=>'attribute',"selector"=>".{$block_class}-button","attribute"=>'href'],
			"iconSrc"=>["source"=>'attribute',"selector"=>".{$block_class}-button__icon-img","attribute"=>'src'],
			"iconAlt"=>["source"=>'attribute',"selector"=>".{$block_class}-button__icon-img","attribute"=>'alt'],
		],
		"default"=>[
			[
				"classes"=>".{$block_class}__item is-default",
				"text"=>'お問合せ',
				"url"=>'[home_url]/contact'
			]
		]
	],
	"loopParam"=>["type"=>'text'],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];