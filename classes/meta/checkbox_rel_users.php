<?php
namespace Catpow\meta;

class checkbox_rel_users extends select_rel_users{
	public static
		$input_type='checkbox',
		$is_bulk_input=true;
	
	public static function input($meta,$prm){
		$sels=self::get_selections($meta);
		return checkbox::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
}
?>