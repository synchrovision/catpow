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

//Font
$wp_customize->add_section('fonts',[
	'title'=>__('フォント','catpow'),
	'priority'=>40
]);
foreach(style_config::get_font_roles() as $role=>$font_setting){
	$setting_id="fonts[{$role}]";
	$wp_customize->add_setting($setting_id,['default'=>$font_setting['default'],'transport'=>'postMessage']);
	$wp_customize->add_control($setting_id,[
		'type'=>'text',
		'label'=> $font_setting['label'],
		'section'=>'fonts'
	]);
	
}
add_action("customize_save_fonts",["Catpow\\util\\style_config",'update']);

//Font Size
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'font_sizes',[
	'transport'=>'postMessage'
]));
$wp_customize->add_section('font_sizes',[
	'title'=>__('文字サイズ','catpow'),
	'priority'=>40
]);
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'font_sizes',[
	'type'=>'FontSizes',
	'section'=>'font_sizes',
	'param'=>[
		'roles'=>style_config::get_font_size_roles()
	]
]));
add_action("customize_save_font_sizes",["Catpow\\util\\style_config",'update']);