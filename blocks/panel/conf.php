<?php
$attributes=[
	"classes"=>["source"=>'attribute',"selector"=>'ul',"attribute"=>'class',"default"=>'wp-block-catpow-panel panel tile column1 grid32'],
	"items"=>[
		"source"=>'query',
		"selector"=>'li.item',
		'filters'=>[
			'iconHolder'=>['selector'=>'.icon']
		],
		"query"=>[
			'classes'=>['source'=>'attribute','attribute'=>'class'],
			'src'=>['source'=>'attribute','selector'=>'.image [src]','attribute'=>'src'],
			'alt'=>['source'=>'attribute','selector'=>'.image [src]','attribute'=>'alt'],
			'title'=>['source'=>'children','selector'=>'.text h3'],
			'text'=>['source'=>'children','selector'=>'.text p'],
			'iconSrc'=>['source'=>'attribute','selector'=>'.text .icon [src]','attribute'=>'src'],
			'iconAlt'=>['source'=>'attribute','selector'=>'.text .icon [src]','attribute'=>'alt'],
			'linkUrl'=>['source'=>'attribute','selector'=>'.text .link a','attribute'=>'href'],
			'linkText'=>['source'=>'text','selector'=>'.text .link a'],
		],
		"default"=>array_map(function($i){
			return [
				'classes'=>'item hasIcon hasLink hasTitle rspan1 cspan1 color'.($i*2),
				'src'=>cp::get_file_url('/images/dummy.jpg'),
				'alt'=>'dummy',
				'title'=>['Title'],
				'text'=>['Text'],
				'iconSrc'=>cp::get_file_url('/images/dummy_icon.svg'),
				'iconAlt'=>'dummy',
				'linkUrl'=>home_url()
			];
		},range(0,7))
	]
];