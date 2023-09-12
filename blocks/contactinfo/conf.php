<?php
$filters=[
	'iconHolder'=>['selector'=>'.wp-block-catpow-contactinfo__items-item-link-icon']
];
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-contactinfo',"attribute"=>'class',"default"=>'wp-block-catpow-contactinfo is-size-medium has-title has-lead has-caption'],
	
	"title"=>["source"=>'html',"selector"=>'.wp-block-catpow-contactinfo__title','default'=>'Title'],
	"lead"=>["source"=>'html',"selector"=>'.wp-block-catpow-contactinfo__lead','default'=>'Lead'],
	"caption"=>["source"=>'html',"selector"=>'.wp-block-catpow-contactinfo__caption','default'=>'Caption'],
	
	"items"=>[
		"source"=>'query',
		"selector"=>'.wp-block-catpow-contactinfo__items-item',
		'filters'=>[
			'eventDispatcher'=>['selector'=>'.wp-block-catpow-contactinfo__items-item-link']
		],
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"title"=>["source"=>'html',"selector"=>'.wp-block-catpow-contactinfo__items-item-title'],
			"lead"=>["source"=>'html',"selector"=>'.wp-block-catpow-contactinfo__items-item-lead'],
			"link"=>["source"=>'html',"selector"=>'.wp-block-catpow-contactinfo__items-item-link-text'],
			"href"=>["source"=>'attribute','attribute'=>'href',"selector"=>'.wp-block-catpow-contactinfo__items-item-link'],
			"caption"=>["source"=>'html',"selector"=>'.wp-block-catpow-contactinfo__items-item-caption'],
		],
		"default"=>[
			[
				"classes"=>'wp-block-catpow-contactinfo__items-item',
				"title"=>['Title'],
				"lead"=>['Lead'],
				"link"=>'info@example.com',
				"href"=>'mailto:info@example.com',
				"caption"=>['Caption'],
			]
		]
	],
	"loopParam"=>["type"=>'string',"default"=>''],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"isTemplate"=>['type'=>'boolean',"default"=>false],
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];