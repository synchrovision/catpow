<?php
use Catpow\util\style_config;

foreach(style_config::get_color_roles() as $setting_name=>$color_setting){
	$wp_customize->add_setting($setting_name,['default'=>$color_setting['default']]);
	$wp_customize->add_control(new WP_Customize_Color_Control( $wp_customize, $setting_name, [
		'label'=> $color_setting['label'],
		'section'=>'colors',
		'settings'=>$setting_name,
	]));
	add_action("customize_save_{$setting_name}",["Catpow\\util\\style_config",'update']);
}

add_action("customize_save_background_color",["Catpow\\util\\style_config",'update']);
$wp_customize->remove_control('header_textcolor');


