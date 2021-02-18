<?php
/**
* フォント関連の設定を管理
*/
namespace Catpow\util;
class style_config{
	public static 
		$font_roles=[
			'heading'=>['label'=>'見出し','default'=>'sans-serif'],
			'text'=>['label'=>'本文','default'=>'sans-serif'],
			'caption'=>['label'=>'キャプション','default'=>'sans-serif'],
			'decoration'=>['label'=>'装飾','default'=>'sans-serif'],
			'strong'=>['label'=>'強調','default'=>'sans-serif']
		];
	public static function update(){
		do_action('cp_style_config_update');
		update_option('cp_style_config_modified_time',time());
	}
}

?>