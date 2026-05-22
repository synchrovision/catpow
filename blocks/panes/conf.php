<?php
$block_class="wp-block-catpow-panes";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"{$block_class} is-level3"],
	"vars"=>["type"=>"object"],
	"HeadingTag"=>["type"=>"string","default"=>"h3"],
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__item",
		"filters"=>[
			"iconHolder"=>["selector"=>".{$block_class}__item-contents-text-symbol"]
		],
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"title"=>["source"=>"html","selector"=>".{$block_class}__item-contents-text-title"],
			"titleCaption"=>["source"=>"html","selector"=>".{$block_class}__item-contents-text-caption"],

			"src"=>["source"=>"attribute","selector"=>".{$block_class}__item-image [src]","attribute"=>"src"],
			"alt"=>["source"=>"attribute","selector"=>".{$block_class}__item-image [src]","attribute"=>"alt"],
			"imageCode"=>["source"=>"text","selector"=>".{$block_class}__item-image"],

			"linkUrl"=>["source"=>"attribute","selector"=>".{$block_class}__item-link","attribute"=>"href"],
			"linkText"=>["source"=>"html","selector"=>".{$block_class}__item-link"],
		],
		"default"=>array_map(function()use($block_class){
			return [
				"classes"=>"{$block_class}__item",
				"title"=>["Title"],
				"titleCaption"=>["Caption"],
				"src"=>cp::get_file_url("/images/dummy.jpg"),
				"alt"=>"dummy",
				"linkUrl"=>home_url(),
				"linkText"=>"Open"
			];
		},range(0,3))
	],
	"loopCount"=>["type"=>"number","default"=>1],
	
	"doLoop"=>["type"=>"boolean","default"=>false],
	"content_path"=>["type"=>"string","default"=>"post/post"],
	"query"=>["type"=>"string","default"=>""],
];