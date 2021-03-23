<?php
namespace Catpow\meta;

class radio_terms extends select_terms{
	public static
		$input_type='radio';
	public static function input($meta,$prm){
		$sels=self::get_selections($meta);
		return radio::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
}
?>