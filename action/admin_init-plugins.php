<?php
namespace Catpow;

add_filter('plugin_action_links_catpow/catpow.php',function($links){
	$links[]=sprintf('<a href="%s">%s</a>',admin_url().'/admin.php?page=catpow-main',__('設定'));
	return $links;
});