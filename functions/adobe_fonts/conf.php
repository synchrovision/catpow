<?php
use Catpow\util\style_config;
$conf=[
	'cat'=>'adobe',
	'meta'=>[
		'cp_adobe_fonts_pid'=>['type'=>'options','option'=>'cp_adobe_fonts_pid','placeholder'=>'プロジェクトID','size'=>15],
		'fonts'=>['type'=>'jsondata']
	]
];
foreach(style_config::get_font_roles() as $role=>$font_conf){
	$conf['meta']['fonts']['meta'][$role.'_font']=['type'=>'text','label'=>$font_conf['label'],'size'=>50];
}