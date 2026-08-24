<?php
use Catpow\util\BlockConfig;
$block_class="wp-block-catpow-formbuttons";
$buttons_class="cp-buttons";
$button_class="cp-button";
$attributes=[
	"isTemplate"=>["type"=>"boolean","default"=>false],
	"vars"=>["type"=>"object","default"=>[]],
	"classes"=>["source"=>"attribute","selector"=>".{$block_class}","attribute"=>"class","default"=>"{$block_class} {$buttons_class} is-level3 has-content-width has-spacing-type-block has-item-size-medium"],
	"items"=>[
		'type'=>'query',
		'filters'=>[
			'button'=>['class'=>"{$block_class}__button"]
		],
		'query'=>[
			"action"=>["source"=>"attribute","selector"=>".{$block_class}-button","attribute"=>"data-action"],
			"callback"=>["source"=>"attribute","selector"=>".{$block_class}-button","attribute"=>"data-callback"],
			"target"=>["source"=>"attribute","selector"=>".{$block_class}-button","attribute"=>"data-target"],
			"ignoreMessage"=>["source"=>"attribute","selector"=>".{$block_class}-button","attribute"=>"ignore-message"],
		],
		'default'=>[
			["action"=>"send","buttonText"=>__("送信",'catpow')]
		]
	]
];
