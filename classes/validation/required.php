<?php
namespace Catpow\validation;

class required extends validation{
	public static function is_valid(&$val,$conf,$input_id){
		return !empty($val);
	}
	public static function get_message_format($conf){
		return __('入力して下さい','catpow');
	}
}

?>