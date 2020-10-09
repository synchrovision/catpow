<?php
$id=uniqid();
$GLOBALS['loop_block_data'][$id]=[
	'path'=>dirname($attr['content_path']),
	'file'=>basename($attr['content_path']),
	'query'=>$attr['query'],
	'vars'=>['content'=>$content]
];
if($is_preview){
	echo do_shortcode("[loop_block {$id}]");
}
else{echo "[loop_block {$id}]";}