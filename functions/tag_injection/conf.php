<?php
$conf=[
	'cat'=>'site',
	'meta'=>[
		'cp_tag_injection_wp_head'=>[
			'type'=>'options',
			'label'=>'headタグ内',
			'input_type'=>'textarea',
			'placeholder'=>'tags insert into head',
			'cols'=>'50',
			'rows'=>'8'
		],
		'cp_tag_injection_wp_body_open'=>[
			'type'=>'options',
			'label'=>'bodyタグ開始直後',
			'input_type'=>'textarea',
			'placeholder'=>'tags insert after body open',
			'cols'=>'50',
			'rows'=>'8'
		],
		'cp_tag_injection_wp_footer'=>[
			'type'=>'options',
			'label'=>'bodyタグ終了直前',
			'input_type'=>'textarea',
			'placeholder'=>'tags insert before body close',
			'cols'=>'50',
			'rows'=>'8'
		],
	]
];