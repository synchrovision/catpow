<?php
$block_class="wp-block-catpow-sphere";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"{$block_class} is-level3 has-item-size-medium"],
	"vars"=>["type"=>"object"],
	"HeadingTag"=>["type"=>"string","default"=>"h3"],
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__item",
		"filters"=>[
			"iconHolder"=>["selector"=>".{$block_class}__item-texts-icon"]
		],
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"title"=>["source"=>"html","selector"=>".{$block_class}__item-texts-title"],
			"caption"=>["source"=>"html","selector"=>".{$block_class}__item-texts-caption"],
			"src"=>["source"=>"attribute","selector"=>".{$block_class}__item-image [src]","attribute"=>"src"],
			"alt"=>["source"=>"attribute","selector"=>".{$block_class}__item-image [src]","attribute"=>"alt"],
			"imageCode"=>["source"=>"text","selector"=>".{$block_class}__item-image"],
			"text"=>["source"=>"html","selector"=>".{$block_class}__item-texts-text"],
			"linkUrl"=>["source"=>"attribute","selector"=>".{$block_class}__item-texts-link","attribute"=>"href"],
		],
		"default"=>array_map(fn($n)=>[
			"classes"=>"{$block_class}__item",
			"title"=>["Title{$n}"],
			"caption"=>["caption"],
			"src"=>cp::get_file_url("/images/dummy.jpg"),
			"alt"=>"dummy",
			"text"=>["Text"],
			"linkUrl"=>""
		],range(1,3))
	],
	"countPrefix"=>["source"=>"text","selector"=>".{$block_class}__item-texts-counter-prefix","default"=>""],
	"countSuffix"=>["source"=>"text","selector"=>".{$block_class}__item-texts-counter-suffix","default"=>""],
];
