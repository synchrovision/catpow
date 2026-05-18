<?php
$block_class="wp-block-catpow-materials";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>".wp-block-catpow-materials","attribute"=>"class","default"=>"wp-block-catpow-materials is-level3"],
	"vars"=>["type"=>"object"],
	"HeadingTag"=>["type"=>"string","default"=>"h3"],
	"SubHeadingTag"=>["type"=>"string","default"=>"h4"],
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__group",
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"label"=>["source"=>"html","selector"=>".{$block_class}__group-label"],
			"items"=>[
				"source"=>"query",
				"selector"=>".{$block_class}__group-items-item",
				"query"=>[
					"classes"=>["source"=>"attribute","attribute"=>"class"],
					"title"=>["source"=>"html","selector"=>".{$block_class}__group-items-item-title"],
					"caption"=>["source"=>"html","selector"=>".{$block_class}__group-items-item-caption"],
					"amount"=>["source"=>"html","selector"=>".{$block_class}__group-items-item-amount"],
				]
			]
		],
		"default"=>array_map(function($label)use($block_class){
			return [
				"classes"=>"{$block_class}__group".($label?" has-label":""),
				"label"=>$label,
				"items"=>array_map(function($i)use($block_class){
					return [
						"classes"=>"{$block_class}__group-items-item",
						"title"=>["item".$i],
						"caption"=>["caption"],
						"amount"=>["0"],
					];
				},range(0,3))
			];
		},["","A","B","C"])
	],
	"loopCount"=>["type"=>"number","default"=>1],
	
	"doLoop"=>["type"=>"boolean","default"=>false],
	"content_path"=>["type"=>"string","default"=>"post/post"],
	"query"=>["type"=>"string","default"=>""],
];