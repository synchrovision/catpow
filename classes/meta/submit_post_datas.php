<?php
namespace Catpow\meta;

class submit_post_datas extends select_post_datas{
	public static
		$input_type='submit';
	public static function input($meta,$prm){
		$sels=self::get_selections($meta);
		return submit::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
}
?>