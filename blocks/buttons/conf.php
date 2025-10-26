<?php
$block_class='wp-block-catpow-buttons';
$buttons_class='cp-buttons';
$button_class='cp-button';
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>".{$block_class}","attribute"=>'class',"default"=>"{$block_class} {$buttons_class} is-size-medium"],
	'vars'=>['type'=>'object','default'=>[]],
	"items"=>[
		"source"=>'query',
		"selector"=>".{$block_class}__item",
		'filters'=>[
			'iconHolder'=>['selector'=>".{$block_class}-button__icon"],
			'eventDispatcher'=>['selector'=>".{$block_class}-button"]
		],
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"copy"=>["source"=>'html',"selector"=>".{$block_class}-button__copy"],
			"text"=>["source"=>'html',"selector"=>".{$block_class}-button__text"],
			"caption"=>["source"=>'html',"selector"=>".{$block_class}-button__caption"],
			"url"=>["source"=>'attribute',"selector"=>".{$block_class}-button","attribute"=>'href'],
			"iconSrc"=>["source"=>'attribute',"selector"=>".{$block_class}-button__icon-img","attribute"=>'src'],
			"iconAlt"=>["source"=>'attribute',"selector"=>".{$block_class}-button__icon-img","attribute"=>'alt'],
		],
		"default"=>[
			[
				"classes"=>"{$block_class}__item is-default",
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