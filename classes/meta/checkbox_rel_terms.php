<?php
namespace Catpow\meta;

class checkbox_rel_terms extends select_rel_terms{
	public static
		$is_bulk_input=true;
	
	public static function input($meta,$prm){
		$sels=self::get_selections($meta);
		return checkbox::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
}
?>