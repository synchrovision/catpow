<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'table',"attribute"=>'class',"default"=>'wp-block-catpow-datatable spec hasHeaderRow hasHeaderColumn'],

	"rows"=>[
		"source"=>'query',
		"selector"=>'table tr',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"cells"=>[
				"source"=>'query',
				"selector"=>'th,td',
				"query"=>[
					"text"=>["source"=>'children'],
					"classes"=>["source"=>'attribute',"attribute"=>'class'],
					"style"=>["source"=>'attribute',"attribute"=>'style']
				]
			]
		],
		"default"=>[
			["classes"=>'',"cells"=>[
				["text"=>[''],"classes"=>'spacer'],
				["text"=>['Title'],"classes"=>''],
				["text"=>['Title'],"classes"=>'']
			]],
			["classes"=>'',"cells"=>[
				["text"=>['Title'],"classes"=>''],
				["text"=>['Content'],"classes"=>''],
				["text"=>['Content'],"classes"=>'']
			]],
			["classes"=>'',"cells"=>[
				["text"=>['Title'],"classes"=>''],
				["text"=>['Content'],"classes"=>''],
				["text"=>['Content'],"classes"=>'']
			]]
		]
	],
	"file"=>["type"=>'object'],
	"blockState"=>["type"=>'object',"default"=>["enableBlockFormat"=>true]],
	"loopParam"=>["type"=>'text',"default"=>''],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];