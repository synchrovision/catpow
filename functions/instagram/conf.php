<?php
use Catpow\instagram\cpig;
$conf=[
	'cat'=>'sns',
	'meta'=>[
		'instagram_conf'=>['type'=>'options','option'=>'instagram_conf','meta'=>[
			'app_id'=>['type'=>'text','size'=>50],
			'app_secret'=>['type'=>'text','size'=>50],
			'scopes'=>['type'=>'checkbox','value'=>apply_filters('instagram_scopes',[
				'user_profile','user_media'
			])],
			'primary_users'=>['type'=>'checkbox','value'=>array_column(cpig::get_users(),'id','username')],
			'scopes'=>['type'=>'checkbox','value'=>apply_filters('instagram_graph_scopes',[
				'user_profile','user_media'
			])],
		]]
	]
];