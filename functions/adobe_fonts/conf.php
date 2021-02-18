<?php
use Catpow\util\style_config;
$conf=[
	'cat'=>'adobe',
	'meta'=>[
		'cp_adobe_fonts_pid'=>['type'=>'options','option'=>'cp_adobe_fonts_pid','placeholder'=>'プロジェクトID','size'=>15]
	]
];
foreach(style_config::$font_roles as $role=>$font_conf){
	$conf['meta']["{$role}_font"]=['type'=>'options','option'=>"cp_adobe_fonts_{$role}_font",'placeholder'=>$font_conf['label'],'size'=>50];
}