<?php
if($attr['doLoop']){
	$id=uniqid();
	preg_match(
		'|(?P<before_loop><div class=".+?">\s*(<ul.+?</ul>\s*)?<table class=".+?">.+?<tbody>)(?P<content>.*?)(?P<after_loop></tbody>\s*</table></div>)<onEmpty>(?P<on_empty>.*)</onEmpty>|s',
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
