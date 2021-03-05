<?php
namespace Catpow\meta;

class html extends meta{
	public static
		$validation=['html'];
	
	public static function input($meta,$prm){
		$path=$meta->the_data_path;
		add_editor_style('content.css');
		$setting=[
			'textarea_name'=>\cp::get_input_name($path),
			'tinymce'=>['body_class'=>'cp_html'],
			'wpautop'=>false
		];
		ob_start();
		wp_editor($meta->value,\cp::get_input_id($path).'_editor',$setting);
		$rtn=ob_get_clean();
		return $rtn;
	}
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val)){return $val;}
		return sprintf('<div class="cp_html">%s</div>',$val);
	}
}
?>