<?php
/**
* WordPressのDependenciesに関するメソッド
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
				return self::get_loader_src('script',$scripts,$handle);
			},$scripts->to_do))),
			'styles'=>array_values(array_filter(array_map(function($handle)use($styles){
				return self::get_loader_src('style',$styles,$handle);
			},$styles->to_do)))
		];
	}
	public static function get_deps_data(){
		$data=[];
		foreach(['style','script'] as $type){
			$$type=call_user_func('wp_'.$type.'s');
			$$type->all_deps($$type->queue);
			foreach($$type->to_do as $handle){
				$data[$type.'s'][$handle]=[
					'src'=>self::get_loader_src($type,$$type,$handle),
					'extra'=>$$type->registered[$handle]->extra
				];
			}
		}
		return $data;
	}
	public static function get_loader_src($type,$loader,$handle){
		if(empty($src=$loader->registered[$handle]->src)){return false;}
		if(!preg_match('|^(https?:)?//|',$src) && !($loader->content_url && 0 === strpos($src,$loader->content_url))){
			return $loader->base_url.$src;
		}
		return apply_filters($type.'_loader_src',$src,$handle);
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