<?php
namespace Catpow;
$prm=shortcode_atts([0=>false],$atts);
$data=$GLOBALS['loop_block_data'][$prm[0]];


if(cp::$content){
	$path=$data['path'];
	if(!empty($data['values'])){
		$org_vars=cp::$vars;
		foreach($data['values'] as $values){
			cp::$vars=array_merge(cp::$vars,$values);
			echo apply_filters('the_content',$data['content']);
		}
		cp::$vars=$org_vars;
		return;
	}
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
			$query=$cond->get_query($data['path']);
		}
	}
	if(!empty($path)){
		if(strpos($path,'/')===false){
			$loop=\cp::$content->meta($path,$query);
		}
		else{
			if(substr_count($path,'/')==1){$path.='/default';}
			$loop=\cp::$content->query($path,$query);
		}
	}
	else{$loop=\cp::$content;}

	if(is_null($loop->query)){return;}

	if(empty($data['file'])){
		if($loop->is_empty()){
			echo $data['on_empty']??'';
		}
		else{
			echo $data['before_loop']??'';
			foreach($loop->loop() as $obj){
				echo apply_filters('the_content',$data['content']);
			}
			echo $data['after_loop']??'';
		}
	}
	else{
		\cp::enqueue_script($path.'/script.js');
		\cp::enqueue_style($path.'/style.css');
		$loop->render($data['file'],$data['vars']??[]);
	}
}