<?php
header('Content-type:application/json');
echo json_encode([
	'name'=>get_bloginfo('name'),
	'short_name'=>get_bloginfo('name'),
	'description'=>get_bloginfo('description'),
	'icons'=>[
		['src'=>get_site_icon_url(32),'sizes'=>'32x32','type'=>'image/png'],
		['src'=>get_site_icon_url(512),'sizes'=>'512x512','type'=>'image/png'],
	],
	'start_url'=>'index.html',
	'display'=>'fullscreen',
	'theme_color'=>'#'.get_theme_mod('header_textcolor'),
	'background_color'=>'#'.get_theme_mod('background_color')
]);