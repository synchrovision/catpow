<?php
$block_class="wp-block-catpow-definition";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"$block_class is-type-index"],
	
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__item",
		"query"=>[
			"title"=>["source"=>"html","selector"=>".{$block_class}__item-title"],
			"text"=>["source"=>"html","selector"=>".{$block_class}__item-text"],
		],
		"default"=>array_map(function(){
			return [
				"title"=>["Title"],
				"text"=>["Text"]
			];
		},range(0,3))
	],
	"loopParam"=>["type"=>"text","default"=>""],
	"loopCount"=>["type"=>"number","default"=>1],
	
	"doLoop"=>["type"=>"boolean","default"=>false],
	"content_path"=>["type"=>"string","default"=>"post/post"],
	"query"=>["type"=>"string","default"=>""],
];