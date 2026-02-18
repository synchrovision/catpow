<?php
$block_class="wp-block-catpow-contactinfo";
$filters=[
	"iconHolder"=>["selector"=>".{$block_class}__items-item-link-icon"]
];
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"{$block_class} is-level3 is-size-medium has-title has-lead has-caption"],
	'HeadingTag'=>['type'=>'string','default'=>'h3'],

	"itemsClasses"=>["source"=>"attribute","selector"=>".{$block_class}__items","attribute"=>"class","default"=>"{$block_class}__items is-level4"],
	'SubHeadingTag'=>['type'=>'string','default'=>'h4'],
	
	"title"=>["source"=>"html","selector"=>".{$block_class}__title","default"=>"Title"],
	"lead"=>["source"=>"html","selector"=>".{$block_class}__lead","default"=>"Lead"],
	"caption"=>["source"=>"html","selector"=>".{$block_class}__caption","default"=>"Caption"],
	
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__items-item",
		"filters"=>[
			"eventDispatcher"=>["selector"=>".{$block_class}__items-item-link"]
		],
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"title"=>["source"=>"html","selector"=>".{$block_class}__items-item-title"],
			"lead"=>["source"=>"html","selector"=>".{$block_class}__items-item-lead"],
			"link"=>["source"=>"html","selector"=>".{$block_class}__items-item-link-text"],
			"href"=>["source"=>"attribute","attribute"=>"href","selector"=>".{$block_class}__items-item-link"],
			"caption"=>["source"=>"html","selector"=>".{$block_class}__items-item-caption"],
		],
		"default"=>[
			[
				"classes"=>"{$block_class}__items-item",
				"title"=>["Title"],
				"lead"=>["Lead"],
				"link"=>"info@example.com",
				"href"=>"mailto:info@example.com",
				"caption"=>["Caption"],
			]
		]
	],
	"loopParam"=>["type"=>"string","default"=>""],
	"loopCount"=>["type"=>"number","default"=>1],
	
	"isTemplate"=>["type"=>"boolean","default"=>false],
	"doLoop"=>["type"=>"boolean","default"=>false],
	"content_path"=>["type"=>"string","default"=>"post/post"],
	"query"=>["type"=>"string","default"=>""],
];