<?php
if($attr['doLoop']){
	$id=uniqid();
	preg_match(
		'|(?P<before_loop><ul class=".+?">)(?P<content>.*?)(?P<after_loop></ul>)<on-empty>(?P<on_empty>.*)</on-empty>|s',
		$content,
		$matches
	);
	$GLOBALS['loop_block_data'][$id]=[
		'path'=>$attr['content_path'],
		'query'=>$attr['query'],
		'before_loop'=>$matches['before_loop'],
		'content'=>$matches['content'],
		'after_loop'=>$matches['after_loop'],
		'on_empty'=>$matches['on_empty'],
	];
	echo "[loop_block {$id}]";
}
else{
	echo $content;
}
