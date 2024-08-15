<?php
use Catpow\util\BlockConfig;
$attributes=[
	'vars'=>['type'=>'object','default'=>['--cp-image-opacity'=>'0.5','--cp-image-blendmode'=>'normal','--cp-item-size'=>'300']],
	"classes"=>["source"=>'attribute',"selector"=>'div',"attribute"=>'class',"default"=>'wp-block-catpow-slider story hasTitle hasText hasImage hasArrows hasDots'],
	"controlClasses"=>["source"=>'attribute',"selector"=>'div.controls',"attribute"=>'class',"default"=>'controls loop autoplay flickable'],
	"config"=>[
		"source"=>'attribute',
		"selector"=>'div.controls',
		"attribute"=>'data-config',
		"default"=>'{}'
	],
	"items"=>[
		"source"=>'query',
		"selector"=>'ul.contents>li.item,ul.contents>li',
		"query"=>[
			"classes"=>["source"=>'attribute',"attribute"=>'class'],
			"title"=>["source"=>'html',"selector"=>'.text h3,.texts .title'],
			"subTitle"=>["source"=>'html',"selector"=>'.text h4,.texts .subtitle'],
			"src"=>["source"=>'attribute',"selector"=>'.image [src]',"attribute"=>'src'],
			"alt"=>["source"=>'attribute',"selector"=>'.image [src]',"attribute"=>'alt'],
			"imageCode"=>["source"=>'text',"selector"=>'.image'],
			"slideSrc"=>["source"=>'attribute',"selector"=>'.slide [src]',"attribute"=>'src'],
			"slideAlt"=>["source"=>'attribute',"selector"=>'.slide [src]',"attribute"=>'alt'],
			"slideSrcset"=>["source"=>'attribute',"selector"=>'.slide [src]',"attribute"=>'srcset'],
			"slideCode"=>["source"=>'text',"selector"=>'.slide'],
			"slideSources"=>BlockConfig::getPictureSoucesAttributes('.slide picture'),
			"text"=>["source"=>'html',"selector"=>'.text p,.texts .text'],
			"linkUrl"=>["source"=>'attribute',"selector"=>'a',"attribute"=>'href'],
			"backgroundImageSrc"=>["source"=>'attribute',"selector"=>'.background [src]',"attribute"=>'src'],
			"backgroundImageAlt"=>["source"=>'attribute',"selector"=>'.background [src]',"attribute"=>'alt'],
			"backgroundImageSrcset"=>["source"=>'attribute',"selector"=>'.background [src]',"attribute"=>'srcset'],
			"backgroundImageCode"=>["source"=>'text',"selector"=>'.background'],
			"backgroundImageSources"=>BlockConfig::getPictureSoucesAttributes('.background picture')
		],
		"default"=>array_map(function($n){
			return [
				"classes"=>'item',
				"title"=>["Title{$n}"],
				"subTitle"=>['SubTitle'],

				"src"=>cp::get_file_url('/images/dummy.jpg'),
				"alt"=>'dummy',
				'slideSources'=>BlockConfig::getPictureSoucesAttributesDefaultValueForDevices(['sp','tb']),

				"slideSrc"=>cp::get_file_url('/images/dummy_symbol.svg'),
				"slideAlt"=>'dummy',

				"text"=>['Text'],
				"linkUrl"=>'https://',
				"backgroundImageSrc"=>cp::get_file_url('/images/dummy_bg.jpg'),
				"backgroundImageAlt"=>'dummy',
				"backgroundImageSrcset"=>null,
				'backgroundImageSources'=>BlockConfig::getPictureSoucesAttributesDefaultValueForDevices(['sp','tb'],'dummy_bg.jpg')
			];
		},range(1,3))
	],
	"blockState"=>["type"=>'object',"default"=>["enableBlockFormat"=>false]],
	"loopParam"=>["type"=>'text',"default"=>''],
	"loopCount"=>["type"=>'number',"default"=>1],
	
	"doLoop"=>['type'=>'boolean',"default"=>false],
	'content_path'=>['type'=>'string','default'=>'post/post'],
	'query'=>['type'=>'string','default'=>''],
];