<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-accessmap',"attribute"=>'class',"default"=>'wp-block-catpow-accessmap medium'],
	
	'TitleTag'=>['type'=>'string','default'=>'h3'],
	"linkText"=>["source"=>'attribute',"selector"=>'.link a',"attribute"=>'href'],
	
	'z'=>['type'=>'number','default'=>'16'],
	't'=>['type'=>'string','default'=>'m'],
	'hl'=>['type'=>'string','default'=>'ja'],
	
	"items"=>[
		"source"=>'query',
		"selector"=>'.item',
		"query"=>[
			"classes"=>["source"=>"attribute","attribute"=>"class"],
			"title"=>["source"=>'html',"selector"=>'.access .title'],
			"address"=>["source"=>'html',"selector"=>'.access .address'],
			"tel"=>["source"=>'html',"selector"=>'.access .tel'],
			"mail"=>["source"=>'html',"selector"=>'.access .mail'],
			"site"=>["source"=>'html',"selector"=>'.access .site'],
			"info"=>["source"=>'html',"selector"=>'.access .info'],

			'll'=>['source'=>'attribute','selector'=>'.map .gmap','attribute'=>'data-ll'],
			'q'=>['source'=>'attribute','selector'=>'.map .gmap','attribute'=>'data-q'],
			'src'=>['source'=>'attribute','selector'=>'.map .gmap','attribute'=>'src'],
		],
		"default"=>[[
			"classes"=>'item useQuery',
			"title"=>'Title',
			"address"=>'Osaka city',
			"tel"=>'00-0000-0000',
			"mail"=>'info@example.com',
			"site"=>'https://example.com',
			"info"=>'info',

			"ll"=>'',
			"q"=>'',
			"src"=>''
		]]
	],
	"loopParam"=>["type"=>'string',"default"=>''],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];