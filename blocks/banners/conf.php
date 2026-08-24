<?php
use Catpow\util\BlockConfig;
$block_class='wp-block-catpow-banners';
$attributes=[
	"isTemplate"=>["type"=>"boolean","default"=>false],
	'classes'=>["source"=>'attribute',"selector"=>".{$block_class}","attribute"=>'class','default'=>"{$block_class} has-content-width has-title has-item-size-small is-level3 has-spacing-type-block"],
	'HeadingTag'=>['type'=>'string','default'=>'h3'],
	'vars'=>['type'=>'object','default'=>[]],
	"items"=>[
		"source"=>'query',
		"selector"=>".{$block_class}__item",
		'filters'=>[
			'link'=>[]
		],
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"title"=>["source"=>'html',"selector"=>".{$block_class}__item-title"],
			"sources"=>BlockConfig::getPictureSoucesAttributesForDevices(['sp','tb']),
			"src"=>["source"=>'attribute',"selector"=>".{$block_class}__item-link-image-img","attribute"=>'src'],
			"alt"=>["source"=>'attribute',"selector"=>".{$block_class}__item-link-image-img","attribute"=>'alt'],
			"imageCode"=>["source"=>'text',"selector"=>".{$block_class}__item-link"]
		],
		"default"=>array_map(fn()=>[
			"classes"=>"{$block_class}__item",
			"title"=>['Title'],
			"sources"=>BlockConfig::getPictureSoucesAttributesDefaultValueForDevices(['sp','tb']),
			"src"=>cp::get_file_url('/images/dummy_banner.svg'),
			"alt"=>'dummy',
			"imageCode"=>'[output image]'
		],range(0,2))
	],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];