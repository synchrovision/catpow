<?php
/**
* WPのAjaxのメソッド
*/
namespace Catpow\util;
class wp{
	public static function get_deps(){
		$scripts=wp_scripts();
		$scripts->all_deps($scripts->queue);
		$styles=wp_styles();
		$styles->all_deps($styles->queue);
		return [
			'scripts'=>array_values(array_filter(array_map(function($handle)use($scripts){
				if(empty($src=$scripts->registered[$handle]->src)){return false;}
				if(!preg_match('|^(https?:)?//|',$src) && !($scripts->content_url && 0 === strpos($src,$scripts->content_url))){
					return $scripts->base_url.$src;
				}
				return apply_filters('script_loader_src',$src,$handle);
			},$scripts->to_do))),
			'styles'=>array_values(array_filter(array_map(function($handle)use($styles){
				if(empty($src=$styles->registered[$handle]->src)){return false;}
				if(!preg_match( '|^(https?:)?//|',$src) && !($styles->content_url && 0 === strpos($src,$styles->content_url))){
					 return $styles->base_url.$src;
				}
				return apply_filters('style_loader_src',$src,$handle);
			},$styles->to_do)))
		];
	}
	public static function get_plugin_data_from_dir($dir){
		foreach(glob(rtrim($dir,'/').'/*.php') as $file){
			$plugin_data=get_plugin_data($file,false,false);
			if(!empty($plugin_data['Name'])){return $plugin_data;}
		}
		return null;
	}
}

?>