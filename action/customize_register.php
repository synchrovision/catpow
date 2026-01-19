<?php
use Catpow\util\style_config;

//remove wp color customize
$wp_customize->remove_control('background_color');
remove_theme_mod('background_color');
$wp_customize->remove_control('header_textcolor');

//Color
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'colors',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'colors',[
	'type'=>'ColorSet',
	'section'=>'colors',
	'param'=>[
		'roles'=>style_config::get_color_roles()
	]
]));
add_action("customize_save_colors",["Catpow\\util\\style_config",'update']);

//Layout
$wp_customize->add_section('layout',[
	'title'=>__('レイアウト','catpow'),
	'priority'=>40
]);
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'size',[
	'transport'=>'postMessage'
]));


//Font Size
$wp_customize->add_section('font',[
	'title'=>__('テキスト','catpow'),
	'priority'=>40
]);
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'font_size',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'font_size',[
	'type'=>'FontSizes',
	'section'=>'font',
	'label'=>'文字サイズ',
	'param'=>[
		'roles'=>style_config::get_font_size_roles()
	]
]));
add_action("customize_save_font_size",["Catpow\\util\\style_config",'update']);

//Line Height
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'line_height',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'line_height',[
	'type'=>'LineHeight',
	'section'=>'font',
	'label'=>'行送り',
	'param'=>[
		'roles'=>style_config::get_line_height_roles()
	]
]));
add_action("customize_save_line_height",["Catpow\\util\\style_config",'update']);

//Letter Spacing
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'letter_spacing',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'letter_spacing',[
	'type'=>'LetterSpacing',
	'section'=>'font',
	'label'=>'文字間隔',
	'param'=>[
		'roles'=>style_config::get_letter_spacing_roles()
	]
]));
add_action("customize_save_line_height",["Catpow\\util\\style_config",'update']);

//Font Weight
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'font_weight',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'font_weight',[
	'type'=>'FontWeight',
	'section'=>'font',
	'label'=>'文字の太さ',
	'param'=>[
		'roles'=>style_config::get_font_weight_roles()
	]
]));
add_action("customize_save_font_weight",["Catpow\\util\\style_config",'update']);

foreach(style_config::get_font_family_roles() as $role=>$font_setting){
	$setting_id="fonts[{$role}]";
	$wp_customize->add_setting($setting_id,['default'=>$font_setting['default'],'transport'=>'postMessage']);
	$wp_customize->add_control($setting_id,[
		'type'=>'text',
		'label'=> $font_setting['label'],
		'section'=>'font'
	]);
	
}
add_action("customize_save_fonts",["Catpow\\util\\style_config",'update']);
