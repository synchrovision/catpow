<?php
namespace Catpow\validation;

class text_maxlength extends validation{
	public static $message_keys=['maxlength'];
	
	public static function is_valid(&$val,$conf,$input_id){
		return mb_strlen($val)<=(int)$conf['maxlength'];
	}
	public static function get_message_format($conf){
		return __('%d文字以内で入力してください','catpow');
	}
}

?>