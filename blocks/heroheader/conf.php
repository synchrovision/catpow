<?php
use Catpow\util\BlockConfig;
$block_class="wp-block-catpow-heroheader";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"{$block_class} is-size-medium is-level1 has-color-scheme-inverted has-text has-buttons"],
	"bodyClasses"=>["source"=>"attribute","selector"=>".{$block_class}__body","attribute"=>"class","default"=>"{$block_class}__body has-item-size-medium has-align-content-center has-text-align-center"],
	"vars"=>["type"=>"object"],
	"HeadingTag"=>["type"=>"string","default"=>"h1"],
	"title"=>["source"=>"html","selector"=>".{$block_class}__body-texts-title","default"=>"[post title]"],
	"text"=>["source"=>"html","selector"=>".{$block_class}__body-texts-text","default"=>"[post excerpt]"],
	"buttons"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__body-buttons-button",
		"filters"=>[
			"iconHolder"=>["selector"=>".{$block_class}__body-buttons-button-link-icon"]
		],
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"text"=>["source"=>"html","selector"=>".{$block_class}__body-buttons-button-link-text"],
			"linkUrl"=>["source"=>"attribute","selector"=>".{$block_class}__body-buttons-button-link","attribute"=>"href"],
		],
		"default"=>array_map(fn($n)=>[
			"classes"=>"{$block_class}__body-buttons-button",
			"text"=>["Text"],
			"linkUrl"=>""
		],range(1,2))
	],
	"images"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__bg-picture",
		"query"=>[
			"sources"=>BlockConfig::getPictureSoucesAttributes(),
			"src"=>["selector"=>"img","source"=>"attribute","attribute"=>"src"],
			"alt"=>["selector"=>"img","source"=>"attribute","attribute"=>"alt"]
		],
		"default"=>array_map(fn($n)=>[
			"sources"=>BlockConfig::getPictureSoucesAttributesDefaultValueForDevices(['tb','sp']),
			"src"=>\cp::get_file_url('images/dummy.jpg'),
			"alt"=>""
		],range(1,3))
	],
	"element"=>["type"=>"string","default"=>"slide-show-basic"],
	"params"=>["type"=>"object","default"=>["zoom"=>12,"interval"=>50,"duration"=>5000]],
];