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

//Size
$wp_customize->add_section('size',[
	'title'=>__('サイズ','catpow'),
	'priority'=>40
]);
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'size',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'size',[
	'type'=>'Sizes',
	'section'=>'size',
	'param'=>[
		'roles'=>style_config::get_size_roles()
	]
]));
add_action("customize_save_size",["Catpow\\util\\style_config",'update']);

//Spacing
$wp_customize->add_section('spacing',[
	'title'=>__('余白・間隔','catpow'),
	'priority'=>40
]);

$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'padding',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'padding',[
	'type'=>'Sizes',
	'section'=>'spacing',
	'label'=>'パディング',
	'param'=>[
		'roles'=>style_config::get_padding_roles()
	]
]));
add_action("customize_save_padding",["Catpow\\util\\style_config",'update']);

$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'margin',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'margin',[
	'type'=>'Sizes',
	'section'=>'spacing',
	'label'=>'マージン',
	'param'=>[
		'roles'=>style_config::get_margin_roles()
	]
]));
add_action("customize_save_margin",["Catpow\\util\\style_config",'update']);



//Font Size
$wp_customize->add_section('font',[
	'title'=>__('テキスト','catpow'),
	'priority'=>40
]);
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'font_size',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'font_size',[
	'type'=>'Sizes',
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
	'type'=>'Sizes',
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
	'type'=>'Sizes',
	'section'=>'font',
	'label'=>'文字間隔',
	'param'=>[
		'roles'=>style_config::get_letter_spacing_roles()
	]
]));
add_action("customize_save_letter_spacing",["Catpow\\util\\style_config",'update']);

//Font Weight
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'font_weight',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'font_weight',[
	'type'=>'Sizes',
	'section'=>'font',
	'label'=>'文字の太さ',
	'param'=>[
		'roles'=>style_config::get_font_weight_roles()
	]
]));
add_action("customize_save_font_weight",["Catpow\\util\\style_config",'update']);

//Font Family
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'font_family',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'font_family',[
	'type'=>'FontFamily',
	'section'=>'font',
	'label'=>'フォント',
	'param'=>[
		'roles'=>style_config::get_font_family_roles()
	]
]));
add_action("customize_save_font_family",["Catpow\\util\\style_config",'update']);


//Border Radius
$wp_customize->add_section('border',[
	'title'=>__('線','catpow'),
	'priority'=>40
]);
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'border_radius',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'border_radius',[
	'type'=>'Sizes',
	'section'=>'border',
	'label'=>'角丸',
	'param'=>[
		'roles'=>style_config::get_border_radius_roles()
	]
]));
add_action("customize_save_border_radius",["Catpow\\util\\style_config",'update']);

//Border Width
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'border_width',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'border_width',[
	'type'=>'Sizes',
	'section'=>'border',
	'label'=>'線の太さ',
	'param'=>[
		'roles'=>style_config::get_border_width_roles()
	]
]));
add_action("customize_save_border_width",["Catpow\\util\\style_config",'update']);

//Shadow
$wp_customize->add_section('shadow',[
	'title'=>__('影','catpow'),
	'priority'=>40
]);
$wp_customize->add_setting(new Catpow\customize\setting($wp_customize,'shadow',[
	'transport'=>'postMessage'
]));
$wp_customize->add_control(new Catpow\customize\control($wp_customize,'shadow',[
	'type'=>'Shadow',
	'section'=>'shadow',
	'param'=>[
		'roles'=>style_config::get_shadow_roles()
	]
]));
add_action("customize_save_shadow",["Catpow\\util\\style_config",'update']);