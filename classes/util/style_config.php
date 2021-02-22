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
			'main_color'=>['label'=>'基本色','default'=>'#888888'],
			'accent_color'=>['label'=>'強調色','default'=>'#EE8800'],
			'text_color'=>['label'=>'文字色','default'=>'#666666']
		]);
	}
	public static function get_font_roles(){
		if(isset(static::$font_roles)){return static::$font_roles;}
		return static::$font_roles=apply_filters('cp_font_roles',[
			'heading'=>['label'=>'見出し','default'=>'sans-serif'],
			'text'=>['label'=>'本文','default'=>'sans-serif'],
			'caption'=>['label'=>'キャプション','default'=>'sans-serif'],
			'decoration'=>['label'=>'装飾','default'=>'sans-serif'],
			'strong'=>['label'=>'強調','default'=>'sans-serif']
		]);
	}
	public static function update(){
		do_action('cp_style_config_update');
		update_option('cp_style_config_modified_time',time());
	}
}

?>