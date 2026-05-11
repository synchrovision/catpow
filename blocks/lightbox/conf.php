<?php
$block_class="wp-block-catpow-lightbox";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"{$block_class} is-level4 is-type-card has-item-size-medium has-image has-title has-caption"],
	"sliderClasses"=>["source"=>"attribute","selector"=>".{$block_class}__slider","attribute"=>"class","default"=>"{$block_class}__slider is-level4 has-image has-title has-text"],
	"vars"=>["type"=>"object"],
	"sliderVars"=>["type"=>"object"],
	"HeadingTag"=>["type"=>"string","default"=>"h3"],
	"SliderHeadingTag"=>["type"=>"string","default"=>"h4"],
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__items-item",
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"title"=>["source"=>"html","selector"=>".{$block_class}__items-item-text-title"],
			"caption"=>["source"=>"html","selector"=>".{$block_class}__items-item-text-caption"],
			
			"thumbnailSrc"=>["source"=>"attribute","selector"=>".{$block_class}__items-item-image [src]","attribute"=>"src"],
			"thumbnailAlt"=>["source"=>"attribute","selector"=>".{$block_class}__items-item-image [src]","attribute"=>"alt"],
			"thumbnailCode"=>["source"=>"attribute","selector"=>".{$block_class}__items-item-image"],
			
			"src"=>["source"=>"attribute","selector"=>".{$block_class}__contents-image [src]","attribute"=>"src"],
			"alt"=>["source"=>"attribute","selector"=>".{$block_class}__contents-image [src]","attribute"=>"alt"],
			"imageCode"=>["source"=>"attribute","selector"=>".{$block_class}__contents-image"],
			
			"sliderTitle"=>["source"=>"html","selector"=>".{$block_class}__contents-title"],
			"sliderText"=>["source"=>"html","selector"=>".{$block_class}__contents-text"],
		],
		"default"=>array_map(function()use($block_class){
			return [
				"classes"=>"{$block_class}__items-item",
				"title"=>["Title"],
				"caption"=>["Caption"],
				"thumbnailSrc"=>cp::get_file_url("/images/dummy.jpg"),
				"thumbnailAlt"=>"dummy",
				"sliderTitle"=>["tilte"],
				"src"=>cp::get_file_url("/images/dummy.jpg"),
				"alt"=>"dummy",
				"sliderText"=>["text"],
			];
		},range(0,3))
	],
	"blockState"=>["type"=>"object","default"=>["enableBlockFormat"=>false]],
	"loopCount"=>["type"=>"number","default"=>1],
	
	"doLoop"=>["type"=>"boolean","default"=>false],
	"content_path"=>["type"=>"string","default"=>"post/post"],
	"query"=>["type"=>"string","default"=>""],
];