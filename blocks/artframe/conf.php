<?php
$block_class="wp-block-catpow-artframe";
$attributes=[
	"color"=>["type"=>"string","default"=>"0"],
	"classes"=>["type"=>"string","selector"=>".{$block_class}","attribute"=>"class","default"=>$block_class." has-padding-bottom-x-large has-color-scheme-inverted has-padding-inline-small has-padding-top-x-large"],
	"contentsClasses"=>["type"=>"string","selector"=>".{$block_class}__contents","attribute"=>"class","default"=>"{$block_class}__contents has-background-color"],
	"contentsBodyClasses"=>["type"=>"string","selector"=>".{$block_class}__contents-body","attribute"=>"class","default"=>"{$block_class}__contents-body has-padding"],
	"vars"=>["type"=>"object","default"=>[]],
	"element"=>["type"=>"string","default"=>"art-frame-cloud"],
	"params"=>["type"=>"object","default"=>[]],
];