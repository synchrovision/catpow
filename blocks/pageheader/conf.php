<?php
use Catpow\util\BlockConfig;
$attributes=[
	'vars'=>['type'=>'object','default'=>['--cp-image-opacity'=>'0.5','--cp-image-blendmode'=>'normal']],
	'classes'=>['source'=>'attribute','selector'=>'.wp-block-catpow-pageheader','attribute'=>'class','default'=>'wp-block-catpow-pageheader'],
	'title'=>['source'=>'text','selector'=>'.wp-block-catpow-pageheader-body-title'],
	
	'backgroundImageSrc'=>['source'=>'attribute','selector'=>'.wp-block-catpow-pageheader-background [src]','attribute'=>'src','default'=>cp::get_file_url('images/dummy_bg.jpg')],
	'backgroundImageSrcset'=>['source'=>'attribute','selector'=>'.wp-block-catpow-pageheader-background [src]','attribute'=>'srcset'],
	'backgroundImageCode'=>['source'=>'text','selector'=>'.wp-block-catpow-pageheader-background'],
	'backgroundImageSources'=>BlockConfig::getPictureSoucesAttributesForDevices(['sp','tb'],'.wp-block-catpow-pageheader-background picture','dummy_bg.jpg'),
	'backgroundImageCode'=>['source'=>'text','selector'=>'.wp-block-catpow-pageheader-background'],
];