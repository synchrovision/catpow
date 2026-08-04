<?php
use Catpow\util\BlockConfig;
$block_class='wp-block-catpow-buttons';
$buttons_class='cp-buttons';
$button_class='cp-button';
$attributes=[
	"isTemplate"=>["type"=>"boolean","default"=>false],
	"classes"=>["source"=>'attribute',"selector"=>".{$block_class}","attribute"=>'class',"default"=>"{$block_class} {$buttons_class} is-level3 has-item-size-medium"],
	'vars'=>['type'=>'object','default'=>[]],
	"items"=>BlockConfig::getButtonsAttributes("{$block_class}__item"),
	"loopParam"=>["type"=>'text'],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];