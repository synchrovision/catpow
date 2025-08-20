<?php
if($attr['doLoop']){
	$id=uniqid();
	preg_match(
		'|(?P<before_loop><table class=".+?">.+?<tbody>)(?P<content>.*?)(?P<after_loop></tbody>\s*</table>)<on-empty>(?P<on_empty>.*)</on-empty>|s',
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
