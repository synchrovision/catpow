<?php
/**
* フォント関連の設定を管理
*/
namespace Catpow\util;
class style_config{
	public static 
		$color_roles,
		$font_roles;
	public static function get_color_roles(){
		if(isset(static::$color_roles)){return static::$color_roles;}
		return static::$color_roles=apply_filters('cp_color_roles',[
			'background'=>['label'=>'背景色','default'=>'#ffffff','shorthand'=>'b'],
			'main'=>['label'=>'基本色','default'=>'#888888','shorthand'=>'m'],
			'accent'=>['label'=>'強調色','default'=>'#EE8800','shorthand'=>'a'],
			'text'=>['label'=>'文字色','default'=>'#666666','shorthand'=>'t']
		]);
	}
	public static function get_font_roles(){
		if(isset(static::$font_roles)){return static::$font_roles;}
		return static::$font_roles=apply_filters('cp_font_roles',[
			'heading'=>['label'=>'見出し','default'=>'sans-serif','shorthand'=>'h'],
			'text'=>['label'=>'本文','default'=>'sans-serif','shorthand'=>'t'],
			'caption'=>['label'=>'キャプション','default'=>'sans-serif','shorthand'=>'c'],
			'decoration'=>['label'=>'装飾','default'=>'sans-serif','shorthand'=>'d'],
			'strong'=>['label'=>'強調','default'=>'sans-serif','shorthand'=>'s']
		]);
	}
	public static function update($wp_customize_settings=null){
		if(isset($wp_customize_settings)){
			$id_data=$wp_customize_settings->id_data();
			$id=$id_data['base'];
			$key=$id_data['keys'][0];
			if($f=\cp::get_file_path("json/{$id}.json")){
				$vars=(array)json_decode(file_get_contents($f),true);
			}
			else{
				$f=get_stylesheet_directory()."/json/{$id}.json";
				$vars=get_theme_mod($id);
			}
			$vars[$key]=$wp_customize_settings->post_value();
			file_put_contents($f,json_encode($vars,\JSON_UNESCAPED_UNICODE));
		}
		do_action('cp_style_config_update');
		update_option('cp_style_config_modified_time',time());
	}
}

?>