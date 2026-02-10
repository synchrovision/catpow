<?php
use Catpow\util\BlockConfig;
$block_class='wp-block-catpow-banners';
$attributes=[
	'classes'=>["source"=>'attribute',"selector"=>".{$block_class}","attribute"=>'class','default'=>"{$block_class} has-content-width has-title"],
	'HeadingTag'=>['type'=>'string','default'=>'h3'],
	'vars'=>['type'=>'object','default'=>[]],
	"items"=>[
		"source"=>'query',
		"selector"=>".{$block_class}__item",
		'filters'=>[
			'eventDispatcher'=>['selector'=>".{$block_class}__item-link"]
		],
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"title"=>["source"=>'html',"selector"=>".{$block_class}__item-title"],
			"sources"=>BlockConfig::getPictureSoucesAttributesForDevices(['sp','tb']),
			"src"=>["source"=>'attribute',"selector"=>".{$block_class}__item-link-image-img","attribute"=>'src'],
			"alt"=>["source"=>'attribute',"selector"=>".{$block_class}__item-link-image-img","attribute"=>'alt'],
			"imageCode"=>["source"=>'text',"selector"=>".{$block_class}__item-link"],
			"linkUrl"=>["source"=>'attribute',"selector"=>".{$block_class}__item-link","attribute"=>'href'],
			"target"=>["source"=>'attribute',"selector"=>".{$block_class}__item-link","attribute"=>'target'],
			"event"=>["source"=>'attribute',"selector"=>".{$block_class}__item-link","attribute"=>'data-event']
		],
		"default"=>array_map(fn()=>[
			"classes"=>"{$block_class}__item",
			"title"=>['Title'],
			"sources"=>BlockConfig::getPictureSoucesAttributesDefaultValueForDevices(['sp','tb']),
			"src"=>cp::get_file_url('/images/dummy_banner.svg'),
			"alt"=>'dummy',
			"linkUrl"=>home_url(),
			"imageCode"=>'[output image]'
		],range(0,3))
	],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];