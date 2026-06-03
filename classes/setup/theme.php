<?php
namespace Catpow\setup;

class theme implements iSetup{
	static function exec(){
		\cp::$content->receive();
		$params=[];
		foreach(\cp::$content->conf['meta'] as $meta_name=>$meta_conf){
			$params[$meta_name]=\cp::$content->meta($meta_name)->value[0];
		}
		$theme_name='catpow-'.$params['theme_name'];
		if(file_exists(get_theme_root().'/'.$theme_name)){
			$i=1;
			while(file_exists(get_theme_root().'/'.$theme_name.'-'.$i)){$i++;}
			$params['theme_name'].='-'.$i;
			$theme_name.='-'.$i;
		}
		chdir(WP_CONTENT_DIR);
		passthru("cp -r plugins/catpow/theme_default themes/{$theme_name}");
		$allowedthemes=get_option('allowedthemes');
		$allowedthemes[$theme_name]=true;
		update_option('allowedthemes',$allowedthemes);

		self::replace_placeholders_in_theme(get_theme_root().'/'.$theme_name,$params);
		echo("create new theme : {$theme_name}");
	}
	protected static function replace_placeholders_in_theme($theme,$params){
		$placeholders=array_map(fn($keyword)=>sprintf('{%%%s%%}',$keyword),array_keys($params));
		$replaces=array_values($params);
		foreach(glob($theme.'/{*.css,*.scss,templates/*.html}',\GLOB_BRACE) as $f){
			file_put_contents($f,str_replace($placeholders,$replaces,file_get_contents($f)));
		}
	}
}