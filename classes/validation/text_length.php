<?php
namespace Catpow\validation;

class text_length extends validation{
	public static $message_keys=['length'];
	
	public static function is_valid(&$val,$conf,$input_id){
		return mb_strlen($val)!==(int)$conf['length'];
	}
	public static function get_message_format($conf){
		return __('%d文字で入力してください','catpow');
	}
}

?>