<?php
$block_class="wp-block-catpow-listed";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>"ul","attribute"=>"class","default"=>"wp-block-catpow-listed is-level-3 is-type-menu has-item-size-medium has-header has-title has-title-caption has-image has-text"],
	"commonItemClasses"=>["type"=>"string"],
	"vars"=>['type'=>'object'],
	
	"HeadingTag"=>["type"=>"string","default"=>"h3"],
	
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__item",
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"data-class"],
			"title"=>["source"=>"html","selector"=>".{$block_class}__item-header-text-title"],
			"titleCaption"=>["source"=>"html","selector"=>".{$block_class}__item-header-text-titlecaption"],

			"headerImageSrc"=>["source"=>"attribute","selector"=>".{$block_class}__item-header-image [src]","attribute"=>"src"],
			"headerImageAlt"=>["source"=>"attribute","selector"=>".{$block_class}__item-header-image [src]","attribute"=>"alt"],
			"headerImageCode"=>["source"=>"text","selector"=>".{$block_class}__item-header-image"],

			"subImageSrc"=>["source"=>"attribute","selector"=>".{$block_class}__item-contents-image [src]","attribute"=>"src"],
			"subImageAlt"=>["source"=>"attribute","selector"=>".{$block_class}__item-contents-image [src]","attribute"=>"alt"],
			"subImageCode"=>["source"=>"text","selector"=>".{$block_class}__item-contents-image"],

			"src"=>["source"=>"attribute","selector"=>".{$block_class}__item-image [src]","attribute"=>"src"],
			"alt"=>["source"=>"attribute","selector"=>".{$block_class}__item-image [src]","attribute"=>"alt"],
			"imageCode"=>["source"=>"text","selector"=>".{$block_class}__item-image"],

			"subTitle"=>["source"=>"html","selector"=>".{$block_class}__item-contents-subtitle"],
			"text"=>["source"=>"html","selector"=>".{$block_class}__item-contents-text"],
			"linkUrl"=>["source"=>"attribute","selector"=>".{$block_class}__item-link a","attribute"=>"href"],
		],
		"default"=>array_map(function()use($block_class){
			return [
				"classes"=>"{$block_class}__item",
				"title"=>["Title"],
				"titleCaption"=>["Caption"],
				"headerImageSrc"=>cp::get_file_url("/images/dummy.jpg"),
				"headerImageAlt"=>"dummy",
				"subTitle"=>["SubTitle"],
				"src"=>cp::get_file_url("/images/dummy.jpg"),
				"alt"=>"dummy",
				"text"=>["Text"],
				"linkUrl"=>home_url()
			];
		},range(0,3))
	],
	"countPrefix"=>["source"=>"text","selector"=>".{$block_class}__item-header-counter-prefix","default"=>""],
	"countSuffix"=>["source"=>"text","selector"=>".{$block_class}__item-header-counter-suffix","default"=>""],
	"subCountPrefix"=>["source"=>"text","selector"=>".{$block_class}__item-contents-counter-subcounter .prefix","default"=>""],
	"subCountSuffix"=>["source"=>"text","selector"=>".{$block_class}__item-contents-counter-suffix","default"=>""],
	"loopParam"=>["type"=>"string","default"=>""],
	"loopCount"=>["type"=>"number","default"=>1],
	
	"doLoop"=>["type"=>"boolean","default"=>false],
	"content_path"=>["type"=>"string","default"=>"post/post"],
	"query"=>["type"=>"string","default"=>""],
];