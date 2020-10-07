<?php
namespace Catpow;
$prm=shortcode_atts([0=>false],$atts);
$data=$GLOBALS['loop_block_data'][$prm[0]];

if(empty($data['query'])){
	$query=null;
}
else{
	$data['query']=do_shortcode($data['query']);
	if($data['query'][0]==='{'){
		$query=json_decode($data['query'],1)?:null;
	}
	elseif($data['query'][0]==='[' && preg_match('/^\[([\w_\\\:]+)(\s(.+))?\]$/',$data['query'],$matches)){
		$query=$matches[1](shortcode_parse_atts($matches[3]));
	}
	else{
		$cond=new util\cond($data['query']);
		$query=[
			'relation'=>$cond->relation,
			'meta_query'=>$cond->lines,
			'orderby'=>$cond->orderby,
			'limit'=>$cond->limit
		];
	}
	error_log(var_export($query,1).__FILE__.__LINE__);
}

if(cp::$content){
	foreach(loop($data['path'],$query) as $obj){
		echo do_shortcode($data['content']);
	}
}