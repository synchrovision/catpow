<?php
return [
	'type'=>'Contents',
	'schema'=>[
		'properties'=>[
			'title'=>['type'=>'string'],
			'image'=>['@type'=>'Image'],
			'url'=>['@type'=>'Url']
		]
	]
];