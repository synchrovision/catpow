<?php
$post_data['meta']=[
	'clear'=>[1],
	'receive'=>[1],
	'push'=>[-1],
	'send_mail'=>[],
	'check_task'=>[-1]
];
$post_data['post_content']=cp::get_block_code('progress',[
	'post'=>$conf_data['name'].'/form',
	'step'=>2
]);
$post_data['post_content']=cp::get_block_code('simpletable',[
	'classes'=>'inputs',
	'rows'=>array_map(function($conf,$name){
		return ['classes'=>empty($conf['required'])?'optional':'required','cells'=>[
			['text'=>$conf['label']],
			['text'=>"[output {$name}]"]
		]];
	},$conf_data['inputs'],array_keys($conf_data['inputs']))
]);
$post_data['post_content'].=cp::get_block_code('formbuttons',[
	'classes'=>'m',
	'items'=>[
		['action'=>'task','text'=>__('戻る','catpow'),'classes'=>'negative'],
		['action'=>'send','text'=>__('送信','catpow'),'classes'=>'primary']
	]
]);