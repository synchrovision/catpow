<?php
namespace Catpow\meta;

class textarea extends meta{
	public static
		$validation=['text'];
	
	public static function output($meta,$prm){
		$val=$meta->value;
		return implode('<br/>',explode(chr(10),$val));
	}
	public static function input($meta,$prm){
		$path=$meta->the_data_path;
		$val=$meta->value;
		return sprintf(
			'<textarea name="%s"%s>%s</textarea>',
			\cp::get_input_name($meta->the_data_path),
			\cp::get_input_attr($meta->the_data_path,$meta->conf),
			$meta->value
		);
	}
}
?>