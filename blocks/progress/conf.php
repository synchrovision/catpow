<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-progress',"attribute"=>'class',"default"=>'wp-block-catpow-progress medium'],
	"progress"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-progress',"attribute"=>'data-progress',"default"=>'0'],
	"countPrefix"=>["source"=>'text',"selector"=>'.counter .prefix'],
	"countSuffix"=>["source"=>'text',"selector"=>'.counter .suffix'],
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		"query"=>[
			"label"=>["source"=>'children',"selector"=>'.label'],
		],
		"default"=>array_map(function($index){
			return [
				"label"=>'Step'.$index,
			];
		},range(1,3))
	]
];