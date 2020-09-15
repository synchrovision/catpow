<?php
namespace Catpow\validation;

class number_length extends validation{
	public static $message_keys=['min','max'];
	
	public static function is_valid(&$val,$conf){
		return (float)$val>=(float)$conf['min'] and (float)$val<=(float)$conf['max'];
	}
	
	public static function get_message_format($conf){
		return __('%d〜%dの数値で入力してください','catpow');
	}
}

?>