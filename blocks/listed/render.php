<?php
if($attr['doLoop']){
	$content=preg_replace_callback(
		'|<loopBlockContent>(?P<content>.*?)</loopBlockContent>|',
		function($matches)use($attr){
			$id=uniqid();
			$GLOBALS['loop_block_data'][$id]=[
				'path'=>$attr['content_path'],
				'query'=>$attr['query'],
				'content'=>$matches['content']
			];
			return "[loop_block {$id}]";
		},
		$content
	);
}

echo $content;