<?php
namespace Catpow\meta;

class radio_rel_users extends select_rel_users{
	public static function input($meta,$prm){
		$sels=self::get_selections($meta);
		return radio::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
}
?>