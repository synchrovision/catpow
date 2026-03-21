<?php
$block_class="wp-block-catpow-dialog";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"{$block_class} is-level3 "],
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__item",
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"title"=>["source"=>"html","selector"=>".{$block_class}__item-header-text-heading"],
			"headerImageSrc"=>["source"=>"attribute","selector"=>".{$block_class}__item-header-image [src]","attribute"=>"src"],
			"headerImageAlt"=>["source"=>"attribute","selector"=>".{$block_class}__item-header-image [src]","attribute"=>"alt"],
			"text"=>["source"=>"html","selector"=>".{$block_class}__item-contents-text"]
		],
		"default"=>array_map(function()use($block_class){
			return [
				"classes"=>"{$block_class}__item has-item-align-left is-type-talk",
				"title"=>["Title"],
				"titleCaption"=>["Caption"],
				"headerImageSrc"=>cp::get_file_url("/images/dummy.jpg"),
				"headerImageAlt"=>"dummy",
				"text"=>["Text"]
			];
		},range(0,3))
	],
	"loopParam"=>["type"=>"text"],
	"loopCount"=>["type"=>"number","default"=>1],
	
	"doLoop"=>["type"=>"boolean","default"=>false],
	"content_path"=>["type"=>"string","default"=>"post/post"],
	"query"=>["type"=>"string","default"=>""],
];