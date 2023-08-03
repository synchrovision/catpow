<?php
$attributes=[
	'json'=>['source'=>'text','selector'=>'script','default'=>json_encode([
		'@context'=>'http://schema.org/',
		'@type'=>'Article',
		'headline'=>'Article Title',
		'author'=>[
			['@type'=>'Parson','name'=>'Author Name']
		],
		'image'=>['']
	],0700)]
];