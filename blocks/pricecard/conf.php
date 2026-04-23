<?php
$block_class="wp-block-catpow-pricecard";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>"ul","attribute"=>"class","default"=>"{$block_class} has-image has-title has-spec has-unit-before"],
	"contentsClasses"=>["source"=>"attribute","selector"=>".{$block_class}__item-contents","attribute"=>"class","default"=>"{$block_class}__item-contents"],
	"HeadingTag"=>["type"=>"string","default"=>"h3"],
	"SubHeadingTag"=>["type"=>"string","default"=>"h4"],
	"priceUnit"=>["source"=>"text","selector"=>".{$block_class}__item-header-text-price-saleprice-unit","default"=>"¥"],
	"priceCaption"=>["source"=>"html","selector"=>".{$block_class}__item-header-text-price-caption","default"=>["（税込）"]],
	"linkText"=>["source"=>"text","selector"=>".{$block_class}__item-contents-link","default"=>"more info"],
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__item",
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"title"=>["source"=>"html","selector"=>".{$block_class}__item-header-text-title"],
			"titleCaption"=>["source"=>"html","selector"=>".{$block_class}__item-header-text-caption"],
			"listPrice"=>["source"=>"text","selector"=>".{$block_class}__item-header-text-price-listprice-number"],
			"salePrice"=>["source"=>"text","selector"=>".{$block_class}__item-header-text-price-saleprice-number"],
			"src"=>["source"=>"attribute","selector"=>".{$block_class}__item-image [src]","attribute"=>"src"],
			"alt"=>["source"=>"attribute","selector"=>".{$block_class}__item-image [src]","attribute"=>"alt"],
			"imageCode"=>["source"=>"text","selector"=>".{$block_class}__item-image"],
			"subTitle"=>["source"=>"html","selector"=>".{$block_class}__item-contents-subtitle"],
			"text"=>["source"=>"html","selector"=>".{$block_class}__item-contents-text"],

			"specLabels"=>["source"=>"query","selector"=>".{$block_class}__item-contents-spec-label","query"=>["text"=>["source"=>"html"]]],
			"specValues"=>["source"=>"query","selector"=>".{$block_class}__item-contents-spec-value","query"=>["text"=>["source"=>"html"]]],
			"linkUrl"=>["source"=>"attribute","selector"=>".{$block_class}__item-contents-link","attribute"=>"href"],
		],
		"default"=>array_map(function()use($block_class){
			return [
				"classes"=>"{$block_class}__item",
				"title"=>["Title"],
				"titleCaption"=>["Caption"],
				"listPrice"=>"0,000",
				"saleprice"=>"0,000",
				"src"=>cp::get_file_url("/images/dummy.jpg"),
				"alt"=>"dummy",
				"subTitle"=>["SubTitle"],
				"text"=>["Text"],
				"specLabels"=>array_map(function(){return ["text"=>["label"]];},range(0,3)),
				"specValues"=>array_map(function(){return ["text"=>["value"]];},range(0,3)),
				"linkUrl"=>home_url()
			];
		},range(0,3))
	],
	"loopParam"=>["type"=>"text","default"=>""],
	"loopCount"=>["type"=>"number","default"=>1],
	
	"doLoop"=>["type"=>"boolean","default"=>false],
	"content_path"=>["type"=>"string","default"=>"post/post"],
	"query"=>["type"=>"string","default"=>""],
];