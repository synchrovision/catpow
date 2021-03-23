<?php
namespace Catpow\meta;

class submit_post_meta extends select_post_meta{
	public static
		$input_type='submit';
	public static function input($meta,$prm){
		$sels=self::get_selections($meta);
		return submit::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
}
?>