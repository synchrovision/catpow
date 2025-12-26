<?php
use Catpow\util\BlockConfig;
$filters=[
	'iconHolder'=>['selector'=>'.icon']
];
$attributes=[
	'color'=>['type'=>'string','default'=>"0"],
	"classes"=>["source"=>'attribute',"selector"=>'div',"attribute"=>'class',"default"=>'wp-block-catpow-div is-type-frame has-thin-border'],
	'vars'=>['type'=>'object','default'=>[]],
	'clipVars'=>['type'=>'object','default'=>['--cp-clip-shape-amount'=>'40','--cp-clip-shape-upper-width'=>'40','--cp-clip-shape-upper-height'=>'40',
	'--cp-clip-shape-below-width'=>'40','--cp-clip-shape-below-height'=>'40']],

	"iconImageSrc"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-div>.icon [src]',"attribute"=>'src',"default"=>cp::get_file_url('images/dummy_bg.jpg')],
	"iconImageAlt"=>["source"=>'attribute',"selector"=>'.wp-block-catpow-div>.icon [src]',"attribute"=>'alt'],

	"frameImageCss"=>["source"=>'text',"selector"=>'style.frameImageCss'],
	"borderImageCss"=>["source"=>'text',"selector"=>'style.borderImageCss'],
];