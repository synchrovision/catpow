<?php
use Catpow\util\BlockConfig;
$filters=[
	'iconHolder'=>['selector'=>'.icon']
];
$attributes=[
	'color'=>['type'=>'string','default'=>"0"],
	'id'=>['source'=>'attribute','selector'=>'.wp-block-catpow-section','attribute'=>'id'],
	'classes'=>['source'=>'attribute','selector'=>'.wp-block-catpow-section','attribute'=>'class','default'=>'wp-block-catpow-section article level3 center catch'],
	'navIcon'=>['source'=>'attribute','selector'=>'.wp-block-catpow-section','attribute'=>'data-icon'],

	'SectionTag'=>['type'=>'string','default'=>'section'],
	'HeadingTag'=>['type'=>'string','default'=>'h2'],

	'prefix'=>['source'=>'html','selector'=>'header div.prefix'],
	'title'=>['source'=>'html','selector'=>'header h2,header .heading','default'=>['Title']],
	'lead'=>['source'=>'html','selector'=>'header p,header .lead'],

	'titleImageMime'=>['source'=>'attribute','selector'=>'header .titleImage [src]','attribute'=>'data-mime'],
	'titleImageSrc'=>['source'=>'attribute','selector'=>'header .titleImage [src]','attribute'=>'src','default'=>cp::get_file_url('images/dummy.jpg')],
	'titleImageSrcset'=>['source'=>'attribute','selector'=>'header .titleImage [src]','attribute'=>'srcset'],
	'titleImageAlt'=>['source'=>'attribute','selector'=>'header .titleImage [src]','attribute'=>'alt'],
	'titleImageCode'=>['source'=>'text','selector'=>'header .titleImage'],
	'titleImageSources'=>BlockConfig::getPictureSoucesAttributesForDevices(
		['sp','tb'],'header .titleImage picture','dummy.jpg'
	),

	'headerImageMime'=>['source'=>'attribute','selector'=>'header .image [src]','attribute'=>'data-mime'],
	'headerImageSrc'=>['source'=>'attribute','selector'=>'header .image [src]','attribute'=>'src','default'=>cp::get_file_url('images/dummy.jpg')],
	'headerImageSrcset'=>['source'=>'attribute','selector'=>'header .image [src]','attribute'=>'srcset'],
	'headerImageAlt'=>['source'=>'attribute','selector'=>'header .image [src]','attribute'=>'alt'],
	'headerImageCode'=>['source'=>'text','selector'=>'header .image'],

	'headerBackgroundImageMime'=>['source'=>'attribute','selector'=>'header .background [src]','attribute'=>'data-mime'],
	'headerBackgroundImageSrc'=>['source'=>'attribute','selector'=>'header .background [src]','attribute'=>'src','default'=>cp::get_file_url('images/dummy_bg.jpg')],
	'headerBackgroundImageSrcset'=>['source'=>'attribute','selector'=>'header .background [src]','attribute'=>'srcset'],
	'headerBackgroundImageAlt'=>['source'=>'attribute','selector'=>'header .background [src]','attribute'=>'alt'],
	'headerBackgroundImageCode'=>['source'=>'text','selector'=>'header .background'],
	'headerBackgroundImageSources'=>BlockConfig::getPictureSoucesAttributesForDevices(
		['sp','tb'],'header .background picture','dummy_bg.jpg'
	),

	'imageMime'=>['source'=>'attribute','selector'=>'.image [src]','attribute'=>'data-mime'],
	'imageSrc'=>['source'=>'attribute','selector'=>'.image [src]','attribute'=>'src','default'=>cp::get_file_url('images/dummy.jpg')],
	'imageSrcset'=>['source'=>'attribute','selector'=>'.image [src]','attribute'=>'srcset'],
	'imageAlt'=>['source'=>'attribute','selector'=>'.image [src]','attribute'=>'alt'],
	'imageCode'=>['source'=>'text','selector'=>'.image'],

	'backgroundImageSrc'=>['source'=>'attribute','selector'=>'.wp-block-catpow-section>.background [src]','attribute'=>'src','default'=>cp::get_file_url('images/dummy_bg.jpg')],
	'backgroundImageSrcset'=>['source'=>'attribute','selector'=>'.wp-block-catpow-section>.background [src]','attribute'=>'srcset'],
	'backgroundImageCode'=>['source'=>'text','selector'=>'.wp-block-catpow-section>.background'],
	'backgroundImageSources'=>BlockConfig::getPictureSoucesAttributesForDevices(
		['sp','tb'],'.wp-block-catpow-section>.background picture','dummy_bg.jpg'
	),

	'patternImageCss'=>['source'=>'text','selector'=>'style.patternImageCss'],
	'headerPatternImageCss'=>['source'=>'text','selector'=>'style.headerPatternImageCss'],
	'frameImageCss'=>['source'=>'text','selector'=>'style.frameImageCss'],
	'borderImageCss'=>['source'=>'text','selector'=>'style.borderImageCss'],

	'iconSrc'=>['source'=>'attribute','selector'=>'.icon [src]','attribute'=>'src','default'=>cp::get_file_url('images/dummy_icon.svg')],
	'iconAlt'=>['source'=>'attribute','selector'=>'.icon [src]','attribute'=>'alt'],
];