<?php
$block_class="wp-block-catpow-pricelist";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"wp-block-catpow-pricelist is-level3 has-content-width"],
	"vars"=>["type"=>"object"],
	"HeadingTag"=>["type"=>"string","default"=>"h3"],
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__item",
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"imageSrc"=>["source"=>"attribute","selector"=>".{$block_class}__item-image [src]","attribute"=>"src"],
			"imageAlt"=>["source"=>"attribute","selector"=>".{$block_class}__item-image [src]","attribute"=>"alt"],
			"imageCode"=>["source"=>"text","selector"=>".{$block_class}__item-image"],
			"title"=>["source"=>"html","selector"=>".{$block_class}__item-title"],
			"caption"=>["source"=>"html","selector"=>".{$block_class}__item-caption"],
			"price"=>["source"=>"html","selector"=>".{$block_class}__item-price"],
		],
		"default"=>array_map(function($i)use($block_class){
			return [
				"classes"=>"{$block_class}__item has-caption is-level3".($i===0?' is-heading':''),
				"imageSrc"=>cp::get_file_url("/images/dummy.jpg"),
				"imageAlt"=>"dummy",
				"imageCode"=>"",
				"title"=>["Product"],
				"caption"=>["caption"],
				"price"=>["¥0,000"],
			];
		},range(0,3))
	],
	"loopParam"=>["type"=>"text","default"=>""],
	"loopCount"=>["type"=>"number","default"=>1],
	
	"doLoop"=>["type"=>"boolean","default"=>false],
	"content_path"=>["type"=>"string","default"=>"post/post"],
	"query"=>["type"=>"string","default"=>""],
];