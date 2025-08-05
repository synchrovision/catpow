<?php
use Catpow\util\BlockConfig;
$block_class="wp-block-catpow-section";
$filters=[
	'iconHolder'=>['selector'=>'.icon']
];
$attributes=[
	'color'=>['type'=>'string','default'=>"0"],
	'classes'=>['type'=>'string','default'=>'is-type-article is-level3 is-align-center has-heading-type-catch'],
	'bodyClasses'=>['type'=>'string','default'=>''],
	'headerClasses'=>['type'=>'string','default'=>''],
	'titleClasses'=>['type'=>'string','default'=>''],
	'navIcon'=>['source'=>'attribute','selector'=>".{$block_class}",'attribute'=>'data-icon'],
	'vars'=>['type'=>'object','default'=>['--cp-clip-shape-amount'=>'40','--cp-clip-shape-upper-width'=>'40','--cp-clip-shape-upper-height'=>'40',
	'--cp-clip-shape-below-width'=>'40','--cp-clip-shape-below-height'=>'40']],
	'headerVars'=>['type'=>'object'],

	'SectionTag'=>['type'=>'string','default'=>'section'],
	'HeadingTag'=>['type'=>'string','default'=>'h2'],

	'prefix'=>['source'=>'html','selector'=>".{$block_class}__header-title-prefix"],
	'title'=>['source'=>'html','selector'=>".{$block_class}__header-title-heading",'default'=>'Title'],
	'lead'=>['source'=>'html','selector'=>".{$block_class}__header-title-lead"],

	'patternImageCss'=>['source'=>'text','selector'=>'style.patternImageCss'],
	'headerPatternImageCss'=>['source'=>'text','selector'=>'style.headerPatternImageCss'],
	'frameImageCss'=>['source'=>'text','selector'=>'style.frameImageCss'],
	'borderImageCss'=>['source'=>'text','selector'=>'style.borderImageCss'],
	
	'decoration'=>BlockConfig::getPlacedPicturesAttributesForDevices(
		['sp','tb'],".{$block_class}__decoration",'dummy_deco.png'
	),

	'iconSrc'=>['source'=>'attribute','selector'=>'.icon [src]','attribute'=>'src','default'=>cp::get_file_url('images/dummy_icon.svg')],
	'iconAlt'=>['source'=>'attribute','selector'=>'.icon [src]','attribute'=>'alt'],
]
+BlockConfig::getPictureAttributes(".{$block_class}__header-title-image-image",'headerImage',['tb','sp'],'dummy_title_image.png')
+BlockConfig::getPictureAttributes(".{$block_class}__header-title-titleimage-image",'titleImage',['tb','sp'],'dummy_title_image.png');