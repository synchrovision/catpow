<?php
namespace Catpow\setup;

class theme implements iSetup{
	static function exec(){
		if(is_multisite()){
			if(\SUBDOMAIN_INSTALL){$theme_name='catpow-'.explode('.',get_blog_details()->domain)[0];}
			else{$theme_name='catpow-'.basename(get_blog_details()->path);}
		}
		else{$theme_name='catpow-'.$_SERVER['HTTP_HOST'];}
		if(file_exists(get_theme_root().'/'.$theme_name)){
			$i=1;
			while(file_exists(get_theme_root().'/'.$theme_name.'-'.$i)){$i++;}
			$theme_name=$theme_name.'-'.$i;
		}
		dir_copy(WP_PLUGIN_DIR.'/catpow/theme_default',get_theme_root().'/'.$theme_name);
		$allowedthemes=get_option('allowedthemes');
		$allowedthemes[$theme_name]=true;
		update_option('allowedthemes',$allowedthemes);
		echo("create new theme : {$theme_name}");
	}
}