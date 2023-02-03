<?php
use Catpow\util\BlockConfig;

$attributes=[
	"id"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-graphics',"attribute"=>'id',"default"=>''],
	"classes"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-graphics',"attribute"=>'class',"default"=>'wp-block-catpow-graphics hasBaseImage'],
	"src"=>["source"=>'attribute',"selector"=>'.base [src]',"attribute"=>'src',"default"=>cp::get_file_url('/images/dummy_bg.jpg')],
	"srcset"=>["source"=>'attribute',"selector"=>'.base [src]',"attribute"=>'srcset'],
	"alt"=>["source"=>'attribute',"selector"=>'.base [src]',"attribute"=>'alt'],
	"sources"=>BlockConfig::getPictureSoucesAttributesForDevices(['sp','tb'],'.base picture','dummy_bg.jpg'),
	"heights"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-graphics','attribute'=>'data-heights',"default"=>'60,80,120'],
	"items"=>[
		"source"=>'query',
		"selector"=>'.item',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"rect"=>["source"=>'attribute','attribute'=>'data-rect'],
			"rectSP"=>["source"=>'attribute','attribute'=>'data-rect-sp'],
			"src"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'src'],
			"srcset"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'srcset'],
			"alt"=>["source"=>'attribute',"selector"=>'[src]',"attribute"=>'alt'],
			"sources"=>BlockConfig::getPictureSoucesAttributesForDevices(['sp','tb']),
			"title"=>["source"=>'html',"selector"=>'.title'],
			"lead"=>["source"=>'html',"selector"=>'.lead'],
			"text"=>["source"=>'html',"selector"=>'.text'],
			"link"=>["source"=>'attribute',"attribute"=>'href']
		],
		"default"=>[
			[
				"id"=>'graphics_image1',
				"classes"=>'item isImage type1',
				"rect"=>'25 25 50 50,25 25 50 50,25 25 50 50',
				"src"=>cp::get_file_url('/images/dummy.jpg'),
				"srcset"=>'',
				"alt"=>'',
				"sources"=>BlockConfig::getPictureSoucesAttributesDefaultValueForDevices(['sp','tb']),
				"title"=>['Title'],
				"lead"=>['Lead'],
				"text"=>['Text'],
				"link"=>''
			]
		]
	],
	"device"=>["type"=>'string',"default"=>'pc']
];