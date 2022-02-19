<?php
use Catpow\util\style_config;

$wp_customize->remove_control('background_color');
remove_theme_mod('background_color');
$wp_customize->remove_control('header_textcolor');
foreach(style_config::get_color_roles() as $role=>$color_setting){
	$setting_id="colors[{$role}]";
	$wp_customize->add_setting($setting_id,['default'=>$color_setting['default'],'transport'=>'postMessage']);
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize,$setting_id,[
		'label'=> $color_setting['label'],
		'section'=>'colors',
		'settings'=>$setting_id,
	]));
	
}
add_action("customize_save_colors",["Catpow\\util\\style_config",'update']);

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