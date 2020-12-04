<?php
namespace Catpow\meta;

class html extends meta{
	public static
		$validation=['html'];
	
	public static function input($meta,$prm){
		$path=$meta->the_data_path;
		$setting=array('textarea_name'=>\cp::get_input_name($path));
		ob_start();
		wp_editor($meta->value,\cp::get_input_id($path).'_editor',$setting);
		$rtn=ob_get_clean();
		return $rtn;
	}
}
?>