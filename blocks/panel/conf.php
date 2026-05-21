<?php
$block_class="wp-block-catpow-panel";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"wp-block-catpow-panel is-type-tile has-grid-size1 has-grid2n has-grid3n is-level3"],
	"HeadingTag"=>["type"=>"text","default"=>"h3"],
	"vars"=>["type"=>"object"],
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__items-item",
		"filters"=>[
			"iconHolder"=>["selector"=>".{$block_class}__items-item-texts-icon"]
		],
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"src"=>["source"=>"attribute","selector"=>".{$block_class}__items-item-image [src]","attribute"=>"src"],
			"alt"=>["source"=>"attribute","selector"=>".{$block_class}__items-item-image [src]","attribute"=>"alt"],
			"title"=>["source"=>"html","selector"=>".{$block_class}__items-item-texts-title"],
			"text"=>["source"=>"html","selector"=>".{$block_class}__items-item-texts-text"],
			"iconSrc"=>["source"=>"attribute","selector"=>".{$block_class}__items-item-texts-icon [src]","attribute"=>"src"],
			"iconAlt"=>["source"=>"attribute","selector"=>".{$block_class}__items-item-texts-icon [src]","attribute"=>"alt"],
			"linkUrl"=>["source"=>"attribute","selector"=>".{$block_class}__items-item-texts-link-a","attribute"=>"href"],
			"linkText"=>["source"=>"text","selector"=>".{$block_class}__items-item-texts-link-a"],
		],
		"default"=>array_map(function($i)use($block_class){
			return [
				"classes"=>"{$block_class}__items-item has-icon has-link has-title has-rspan1 has-cspan1 has-color".($i*2),
				"src"=>cp::get_file_url("/images/dummy.jpg"),
				"alt"=>"dummy",
				"title"=>["Title"],
				"text"=>["Text"],
				"iconSrc"=>cp::get_file_url("/images/dummy_icon.svg"),
				"iconAlt"=>"dummy",
				"linkUrl"=>home_url()
			];
		},range(2,7))
	]
];