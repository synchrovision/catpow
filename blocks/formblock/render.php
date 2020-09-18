<?php
preg_match_all(
	'|<formBlockContent name="(?P<name>\w+)"(?: action="(?P<action>.+?)")?>(?P<content>.*?)</formBlockContent>|s',
	$content,
	$matches,
	PREG_SET_ORDER
);

$form=cp::$content->form(
	$attr['content_path'],
	do_shortcode($attr['data_id']??'')?:null,
	$attr['inputs']??null
);
$form->inherit['contents']=true;
$form->contents=array_column($matches,null,'name');

if(!empty($attr['values'])){
	if($attr['values'][0]==='{'){
		$values=json_decode($attr['values'],1)?:null;
	}
	else{
		$values=wp_parse_args($attr['values']);
	}
	$data_path=$form->the_data_path;
	foreach($values as $key=>$val){
		if(strpos($key,'/')){$form->inputs->set($data_path.'/'.dirname($key),$val,basename($key));}
		else{$form->inputs->set($data_path.'/'.$key,$val);}
	}
}
$form->render();
