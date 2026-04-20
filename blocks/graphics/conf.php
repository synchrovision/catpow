<?php
use Catpow\util\BlockConfig;
$block_class="wp-block-catpow-graphics";

$attributes=[
	"id"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"id","default"=>""],
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"{$block_class} has-base-image"],
	"src"=>["source"=>"attribute","selector"=>".{$block_class}__base [src]","attribute"=>"src","default"=>cp::get_file_url("/images/dummy_bg.jpg")],
	"srcset"=>["source"=>"attribute","selector"=>".{$block_class}__base [src]","attribute"=>"srcset"],
	"alt"=>["source"=>"attribute","selector"=>".{$block_class}__base [src]","attribute"=>"alt"],
	"sources"=>BlockConfig::getPictureSoucesAttributesForDevices(["sp","tb"],".{$block_class}__base picture","dummy_bg.jpg"),
	"heights"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"data-heights","default"=>"60,80,120"],
	"items"=>[
		"source"=>"query",
		"selector"=>".{$block_class}__item",
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"rect"=>["source"=>"attribute","attribute"=>"data-rect"],
			"rectSP"=>["source"=>"attribute","attribute"=>"data-rect-sp"],
			"src"=>["source"=>"attribute","selector"=>"[src]","attribute"=>"src"],
			"srcset"=>["source"=>"attribute","selector"=>"[src]","attribute"=>"srcset"],
			"alt"=>["source"=>"attribute","selector"=>"[src]","attribute"=>"alt"],
			"sources"=>BlockConfig::getPictureSoucesAttributesForDevices(["sp","tb"]),
			"title"=>["source"=>"html","selector"=>".{$block_class}__item-body-title"],
			"lead"=>["source"=>"html","selector"=>".{$block_class}__item-body-lead"],
			"text"=>["source"=>"html","selector"=>".{$block_class}__item-body-text"],
			"link"=>["source"=>"attribute","attribute"=>"href"]
		],
		"default"=>[
			[
				"classes"=>"{$block_class}__item is-image type1",
				"rect"=>"25 25 50 50,25 25 50 50,25 25 50 50",
				"src"=>cp::get_file_url("/images/dummy.jpg"),
				"srcset"=>"",
				"alt"=>"",
				"sources"=>BlockConfig::getPictureSoucesAttributesDefaultValueForDevices(["sp","tb"]),
				"title"=>["Title"],
				"lead"=>["Lead"],
				"text"=>["Text"],
				"link"=>""
			]
		]
	],
	"device"=>["type"=>"string","default"=>"pc"],
];