<?php
$post_data['meta']=[
	'clear'=>[1],
	'receive'=>[1],
	'push'=>[-1],
	'send_mail'=>[]
];
$post_data['post_content']=cp::get_block_code('simpletable',[
	'classes'=>'is-level3 is-type-inputs',
	'rows'=>array_map(function($conf,$name){
		return ['classes'=>empty($conf['required'])?'is-optional':'is-required','cells'=>[
			['text'=>$conf['label']],
			['text'=>"[output {$name}]"]
		]];
	},$conf_data['inputs'],array_keys($conf_data['inputs']))
]);
$post_data['post_content'].=cp::get_block_code('formbuttons',[
	'classes'=>'is-level3 has-item-size-medium',
	'items'=>[
		['action'=>'form','text'=>__('戻る','catpow'),'classes'=>'is-rank-tertiary'],
		['action'=>'send','text'=>__('送信','catpow'),'classes'=>'is-rank-primary']
	]
]);