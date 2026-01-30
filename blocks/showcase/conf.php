<?php
$block_class="wp-block-catpow-showcase";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"{$block_class} is-size-medium has-title-caption has-counter has-link"],
	"vars"=>["type"=>"object"],
	
	"TitleTag"=>["type"=>"string","default"=>"h3"],
	
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__item",
		"filters"=>[
			"eventDispatcher"=>["selector"=>".{$block_class}__item-texts-link"]
		],
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"title"=>["source"=>"html","selector"=>".{$block_class}__item-texts-title"],
			"titleCaption"=>["source"=>"html","selector"=>".{$block_class}__item-texts-caption"],

			"src"=>["source"=>"attribute","selector"=>".{$block_class}__item-image [src]","attribute"=>"src"],
			"alt"=>["source"=>"attribute","selector"=>".{$block_class}__item-image [src]","attribute"=>"alt"],
			"imageCode"=>["source"=>"text","selector"=>".{$block_class}__item-image"],

			"text"=>["source"=>"html","selector"=>".{$block_class}__item-texts-text"],
			"linkText"=>["source"=>"html","selector"=>".{$block_class}__item-texts-link"],
			"linkUrl"=>["source"=>"attribute","selector"=>".{$block_class}__item-texts-link","attribute"=>"href"],
		],
		"default"=>array_map(function()use($block_class){
			return [
				"classes"=>"{$block_class}__item",
				"title"=>"Title",
				"titleCaption"=>"Caption",
				"src"=>cp::get_file_url("/images/dummy.jpg"),
				"alt"=>"dummy",
				"text"=>"Text",
				"linkText"=>"Read More",
				"linkUrl"=>home_url()
			];
		},range(0,3))
	],
	"countPrefix"=>["source"=>"text","selector"=>".{$block_class}__item-texts-counter-prefix","default"=>""],
	"countSuffix"=>["source"=>"text","selector"=>".{$block_class}__item-texts-counter-suffix","default"=>""],
	"loopParam"=>["type"=>"string","default"=>""],
	"loopCount"=>["type"=>"number","default"=>1],
	
	"doLoop"=>["type"=>"boolean","default"=>false],
	"content_path"=>["type"=>"string","default"=>"post/post"],
	"query"=>["type"=>"string","default"=>""],
];