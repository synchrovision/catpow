<?php

$id=uniqid();
$GLOBALS['loop_block_data'][$id]=[
	'path'=>$attr['content_path'],
	'query'=>$attr['query'],
	'content'=>$content
];
echo "[loop_block {$id}]";