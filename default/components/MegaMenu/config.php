<?php
use Catpow\MenuManager;
return [
	'schema'=>[
		'type'=>'object',
		'properties'=>[
			'menu'=>[
				'type'=>'object',
				'properties'=>[
					'main'=>[
						'@type'=>'Menu',
						'title'=>'MainMenu'
					]
				],
				'required'=>['main']
			]
		]
	]
];