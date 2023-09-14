<?php
use Catpow\util\BlockConfig;
$filters=[
	'iconHolder'=>['selector'=>'.icon']
];
$attributes=[
	'customColorVars'=>['type'=>'object','default'=>[]],
	'color'=>['type'=>'string','default'=>"0"],
	"classes"=>["source"=>'attribute',"selector"=>'div',"attribute"=>'class',"default"=>'wp-block-catpow-div frame thinBorder'],

	"iconImageSrc"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-div>.icon [src]',"attribute"=>'src',"default"=>cp::get_file_url('images/dummy_bg.jpg')],
	"iconImageAlt"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-div>.icon [src]',"attribute"=>'alt'],

	"backgroundImageSrc"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-div>.background [src]',"attribute"=>'src',"default"=>cp::get_file_url('images/dummy_bg.jpg')],
	'backgroundImageSources'=>BlockConfig::getPictureSoucesAttributesForDevices(
		['sp','tb'],'.background picture','dummy_bg.jpg'
	),
	
	"patternImageCss"=>["source"=>'text',"selector"=>'style.patternImageCss'],
	"frameImageCss"=>["source"=>'text',"selector"=>'style.frameImageCss'],
	"borderImageCss"=>["source"=>'text',"selector"=>'style.borderImageCss'],
];