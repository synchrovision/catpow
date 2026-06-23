<?php
use Catpow\util\BlockConfig;
$block_class="wp-block-catpow-slider";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>"div","attribute"=>"class","default"=>"wp-block-catpow-slider is-level3 is-type-card has-item-size-medium has-title has-text has-image has-arrows has-dots"],
	"vars"=>["type"=>"object","default"=>["--cp-image-opacity"=>"0.5","--cp-image-blendmode"=>"normal","--cp-item-size"=>"300"]],
	"controlClasses"=>["source"=>"attribute","selector"=>".{$block_class}__controls","attribute"=>"class","default"=>"{$block_class}__controls is-loop is-autoplay is-flickable"],
	"HeadingTag"=>["default"=>"h3"],
	"config"=>[
		"source"=>"attribute",
		"selector"=>".{$block_class}",
		"attribute"=>"data-wp-context",
		"default"=>json_encode(['current'=>0,'length'=>5],0500)
	],
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__contents-item",
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"title"=>["source"=>"html","selector"=>".{$block_class}__contents-item-body-texts-title"],
			"caption"=>["source"=>"html","selector"=>".{$block_class}__contents-item-body-texts-caption"],
			"text"=>["source"=>"html","selector"=>".{$block_class}__contents-item-body-texts-text"],
			"linkUrl"=>["source"=>"attribute","selector"=>".{$block_class}__contents-item-body-texts-link","attribute"=>"href"],
			"linkText"=>["source"=>"html","selector"=>".{$block_class}__contents-item-body-texts-link"],
			"src"=>["source"=>"attribute","selector"=>".{$block_class}__contents-item-body-image [src]","attribute"=>"src"],
			"alt"=>["source"=>"attribute","selector"=>".{$block_class}__contents-item-body-image [src]","attribute"=>"alt"],
			"imageCode"=>["source"=>"text","selector"=>".{$block_class}__contents-item-body-image"],
		],
		"default"=>array_map(fn($n)=>[
			"classes"=>"{$block_class}__contents-item",
			"title"=>["Title{$n}"],
			"subTitle"=>["SubTitle"],
			"text"=>["Text"],
			"linkUrl"=>"https://",
			"linkText"=>"Read More",

			"src"=>cp::get_file_url("/images/dummy.jpg"),
			"alt"=>"dummy",
		],range(1,5))
	],
	"blockState"=>["type"=>"object","default"=>["enableBlockFormat"=>false]],
	"loopParam"=>["type"=>"text","default"=>""],
	"loopCount"=>["type"=>"number","default"=>1],
	
	"doLoop"=>["type"=>"boolean","default"=>false],
	"content_path"=>["type"=>"string","default"=>"post/post"],
	"query"=>["type"=>"string","default"=>""],
];