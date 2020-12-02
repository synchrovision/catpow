<?php
header('Content-type:application/json');
echo json_encode([
	'name'=>get_bloginfo('name'),
	'short_name'=>get_bloginfo('name'),
	'description'=>get_bloginfo('description'),
	'icons'=>[
		['src'=>get_site_icon_url(32),'size'=>'32x32','type'=>'image/png'],
		['src'=>get_site_icon_url(512),'size'=>'512x512','type'=>'image/png'],
	]
]);