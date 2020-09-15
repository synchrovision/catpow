<?php
	
add_filter('option_home_ref',function($url){
	static $cache;
	if(isset($cache)){return $cache;}
	$url=trim($url,'/');
	$theme_group=[];
	$pref=get_stylesheet().'-';
	$len=strlen($pref);
	foreach(wp_get_themes(['allowed'=>true]) as $theme){
		if($pref === substr($theme->get_stylesheet(),0,$len)){
			$theme_group[substr($theme->get_stylesheet(),$len)]=$theme->get_stylesheet();
		}
	}
	$maybe_theme_name=explode('/',trim(substr($_SERVER['REQUEST_URI'],strlen(parse_url($url,PHP_URL_PATH))),'/'))[0];
	if(isset($theme_group[$maybe_theme_name])){
		add_filter('stylesheet',function($val)use($maybe_theme_name,$theme_group){
			static $stylesheet;
			if(isset($stylesheet)){return $stylesheet;}
			return $stylesheet=$theme_group[$maybe_theme_name];
		});
		return $cache=$url.'/'.$maybe_theme_name.'/';
	}
	return $cache=$url;
});