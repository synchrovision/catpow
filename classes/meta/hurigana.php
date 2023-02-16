<?php
namespace Catpow\meta;

class hurigana extends katakana{
	
	public static function input($meta,$prm){
		if(empty($meta->conf['reflect'])){return parent::input($meta,$prm);}
		wp_enqueue_script('jquery.catpow.kana_reflection');
		
		$path=$meta->the_data_path;
		$input_name= \cp::get_input_name($path);
		$reflect_name=\cp::get_input_name(dirname($path,2).'/'.$meta->conf['reflect'].'/0');
		
		return parent::input($meta,$prm).'<script>jQuery(function($){$("[name=\''.$input_name.'\']").cp_kana_reflection("'.$reflect_name.'");})</script>';
	}
}
?>