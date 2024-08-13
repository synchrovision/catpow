<?php
return [
	'type'=>'Contents',
	'schema'=>[
		'properties'=>[
			'items'=>[
				'items'=>[
					'@type'=>'MenuItems',
					'requiredFeatures'=>['image','description']
				]
			]
		]
	]
];