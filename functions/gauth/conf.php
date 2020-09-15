<?php
$conf=[
	'cat'=>'google',
	'meta'=>[
		'gauth_conf'=>['type'=>'options','option'=>'gauth_conf','meta'=>[
			'api_key'=>['type'=>'text','size'=>50],
			'application_name'=>['type'=>'text','size'=>50],
			'client_id'=>['type'=>'text','size'=>50],
			'client_secret'=>['type'=>'text','size'=>50],
			'scopes'=>['type'=>'checkbox','value'=>apply_filters('gauth_scopes',[
				'userinfo'=>'https://www.googleapis.com/auth/userinfo.profile email',
				'calendar'=>'https://www.googleapis.com/auth/calendar'
			])]
		]]
	]
];