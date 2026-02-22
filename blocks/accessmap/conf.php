<?php
$block_class="wp-block-catpow-accessmap";
$attributes=[
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"{$block_class} has-item-size-medium"],
	
	"TitleTag"=>["type"=>"string","default"=>"h3"],
	
	"z"=>["type"=>"number","default"=>"16"],
	"t"=>["type"=>"string","default"=>"m"],
	"hl"=>["type"=>"string","default"=>"ja"],
	
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__item",
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"title"=>["source"=>"html","selector"=>".{$block_class}__item-access-title"],
			"address"=>["source"=>"html","selector"=>".{$block_class}__item-access-address"],
			"tel"=>["source"=>"html","selector"=>".{$block_class}__item-access-tel"],
			"mail"=>["source"=>"html","selector"=>".{$block_class}__item-access-mail"],
			"site"=>["source"=>"html","selector"=>".{$block_class}__item-access-site"],
			"info"=>["source"=>"html","selector"=>".{$block_class}__item-access-info"],

			"ll"=>["source"=>"attribute","selector"=>".{$block_class}__item-map-gmap","attribute"=>"data-ll"],
			"q"=>["source"=>"attribute","selector"=>".{$block_class}__item-map-gmap","attribute"=>"data-q"],
			"src"=>["source"=>"attribute","selector"=>".{$block_class}__item-map-gmap","attribute"=>"src"],
		],
		"default"=>[[
			"classes"=>"{$block_class}__item use-query",
			"title"=>"Title",
			"address"=>"Osaka city",
			"tel"=>"00-0000-0000",
			"mail"=>"info@example.com",
			"site"=>"https://example.com",
			"info"=>"info",

			"ll"=>"",
			"q"=>"",
			"src"=>""
		]]
	],
	"loopParam"=>["type"=>"string","default"=>""],
	"loopCount"=>["type"=>"number","default"=>1],
	
	"doLoop"=>["type"=>"boolean","default"=>false],
	"content_path"=>["type"=>"string","default"=>"post/post"],
	"query"=>["type"=>"string","default"=>""],
];