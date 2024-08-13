<?php
use Catpow\MenuManager;
return [
	'schema'=>[
		'type'=>'object',
		'properties'=>[
			'menu'=>[
				'title'=>'Menu',
				'type'=>'object',
				'properties'=>[
					'main'=>[
						'@type'=>'Menu',
						'title'=>'MainMenu'
					],
					'primary'=>[
						'@type'=>'Menu',
						'title'=>'PrimaryMenu'
					]
				],
				'required'=>['main']
			]
		]
	]
];