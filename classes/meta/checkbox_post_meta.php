<?php
namespace Catpow\meta;

class checkbox_post_meta extends select_post_meta{
	public static
		$input_type='checkbox',
		$is_bulk_input=true;
	
	public static function input($meta,$prm){
		$sels=self::get_selections($meta);
		return checkbox::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
}
?>