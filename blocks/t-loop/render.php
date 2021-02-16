<?php
preg_match_all(
	'|<loopBlockContent name="(?P<name>[\w_]+)">(?P<content>.*?)</loopBlockContent>|s',
	$content,
	$matches,
	PREG_SET_ORDER
);
$contents=array_column($matches,null,'name');

$id=uniqid();
$GLOBALS['loop_block_data'][$id]=[
	'path'=>$attr['content_path'],
	'query'=>$attr['query'],
	'content'=>$contents['content']['content'],
	'on_empty'=>$contents['on_empty']['content'],
];
echo "[loop_block {$id}]";