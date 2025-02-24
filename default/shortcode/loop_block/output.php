<?php
namespace Catpow;
$prm=shortcode_atts([0=>false],$atts);
$data=$GLOBALS['loop_block_data'][$prm[0]];


if(CP::$content){
	$path=$data['path']??null;
	if(!empty($data['values'])){
		$org_vars=CP::$vars;
		foreach($data['values'] as $values){
			CP::$vars=array_merge(CP::$vars,$values);
			echo apply_filters('the_content',$data['content']);
		}
		CP::$vars=$org_vars;
		return;
	}
	if(empty($data['query'])){
		$query=null;
	}
	else{
		$data['query']=shortcode::do_shortcode(do_shortcode($data['query']));
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
			$loop=CP::$content->meta($path,$query);
		}
		else{
			if(substr_count($path,'/')==1){$path.='/default';}
			$loop=CP::$content->query($path,$query);
		}
	}
	else{$loop=CP::$content;}

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
		CP::enqueue_script($path.'/script.js');
		CP::enqueue_style($path.'/style.css');
		$loop->render($data['file'],$data['vars']??[]);
	}
}