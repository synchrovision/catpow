<?php
$post_data['meta']=[
	'clear'=>[1],
	'receive'=>[-1],
	'push'=>[-1],
	'send_mail'=>[],
	'check_task'=>[-1]
];
$post_data['post_content']=cp::get_block_code('simpletable',[
	'classes'=>'inputs',
	'rows'=>array_map(function($conf,$name){
		return ['classes'=>empty($conf['required'])?'optional':'required','cells'=>[
			['text'=>$conf['label']],
			['text'=>"[input {$name}]"]
		]];
	},$conf_data['inputs'],array_keys($conf_data['inputs']))
]);
$post_data['post_content'].=cp::get_block_code('formbuttons',[
	'classes'=>'m',
	'items'=>[
		['action'=>'confirm','text'=>__('確認','catpow')]
	]
]);