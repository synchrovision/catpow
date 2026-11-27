<?php
if($attr['doLoop']){
	$id=uniqid();
	if(!preg_match(
		'|(?P<before_loop><div\b[^>]*>\s*<ul class="wp-block-catpow-slider__contents">)(?P<content>.*?)(?P<after_loop></ul>.+</div>)\s*<on-empty>(?P<on_empty>.*)</on-empty>|s',
		$content,
		$matches
	)){
		echo $content;
		return;
	}
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
