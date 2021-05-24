<?php
namespace Catpow\meta;

class color extends meta{
	public static
		$validation=['text','color'];
	
	public static
		$input_type='color';
	
	public static function input($meta,$prm){
		wp_enqueue_style('wp-color-picker');
		wp_enqueue_script('wp-color-picker');
		wp_enqueue_script('cp_colorpicker_script');
		return parent::input($meta,$prm);
	}
	public static function resolve_conf($conf){
		if(empty($conf['role'])){$conf['role']='color';}
		return $conf;
	}
}
?>