<?php
preg_match_all(
	'|<loopContent name="(?P<name>[\w_]+)">(?P<content>.*?)</loopContent>|s',
	$content,
	$matches,
	PREG_SET_ORDER
);
$contents=array_column($matches,null,'name');

$id=uniqid();
$GLOBALS['loop_block_data'][$id]=[
	'path'=>dirname($attr['content_path']),
	'file'=>basename($attr['content_path']),
	'query'=>$attr['query'],
	'vars'=>['contents'=>$contents]
];

if($is_preview){
	echo Catpow\shortcode::do_shortcode(do_shortcode("[loop_block {$id}]"));
}
else{echo "[loop_block {$id}]";}