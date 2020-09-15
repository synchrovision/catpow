<?php
if(empty($attr['query'])){
	$query=null;
}
else{
	if($attr['query'][0]==='{'){
		$query=json_decode($attr['query'],1)?:null;
	}
	elseif($attr['query'][0]==='[' && preg_match('/^\[([\w_\\\:]+)(\s(.+))?\]$/',$attr['query'],$matches)){
		$query=$matches[1](shortcode_parse_atts($matches[3]));
	}
	else{
		$query=wp_parse_args($attr['query']);
	}
}
Catpow\loop($attr['content_path'],$query,['content'=>$content]);
