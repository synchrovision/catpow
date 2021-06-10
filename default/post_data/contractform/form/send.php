<?php
$mail_conf_post_type=$conf_data['meta']['send_mail']['value'];
$post_data['meta']=[
	'clear'=>[1],
	'receive'=>[-1],
	'push'=>[1],
	'send_mail'=>[$mail_conf_post_type.'/notice',$mail_conf_post_type.'/thanks'],
	'check_task'=>[-1]
];
$post_data['post_content']=cp::get_block_code('progress',[
	'post'=>$conf_data['name'].'/form',
	'step'=>3
]);
$post_data['post_content'].=cp::get_block_code('simpletable',[
	'classes'=>'inputs',
	'rows'=>array_map(function($conf,$name){
		return ['classes'=>empty($conf['required'])?'optional':'required','cells'=>[
			['text'=>$conf['label']],
			['text'=>"[output {$name}]"]
		]];
	},$conf_data['inputs'],array_keys($conf_data['inputs']))
]);