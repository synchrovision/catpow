<?php
$mail_conf_post_type=$conf_data['meta']['send_mail']['value'];
$post_data['meta']=[
	'clear'=>[1],
	'receive'=>[1],
	'push'=>[-1],
	'send_mail'=>[$mail_conf_post_type.'/entry'],
	'task_process'=>[[
		'create'=>['action'=>'input','expire'=>'+15 minutes','limit'=>1]
	]],
	'check_task'=>[-1]
];
$post_data['post_content']=cp::get_block_code('section',[
	'clases'=>'article headline',
	'title'=>__('メールを送信しました','catpow')
],[
	cp::get_block_code('paragraph',[
		'content'=>__('申込フォームへのリンクを記載したメールを送信しました。<br/>メールに記載されたリンクから必要事項を記入して申込を行ってください。','catpow')
	])
]);