<?php
namespace Catpow\validation;

class number_length extends validation{
	public static $message_keys=['length'];
	
	public static function is_valid(&$val,$conf,$input_id){
		return preg_match(sprintf('/^[0-9]{%d}$/',$conf['length']),$val);
	}
	
	public static function get_message_format($conf){
		return __('%d桁の数字で入力してください','catpow');
	}
}

?>