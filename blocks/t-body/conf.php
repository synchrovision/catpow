<?php
add_filter('wp_kses_allowed_html',function($allowedposttags){
	$allowedposttags['textmail']=[];
	return $allowedposttags;
});