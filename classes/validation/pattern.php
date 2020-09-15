<?php
namespace Catpow\validation;

class pattern extends validation{
	public static function is_valid(&$val,$conf,$input_id){
		$pattern=static::$pattern??$conf['pattern'];
		return preg_match($pattern,$val);
	}
	public static function get_message_format($conf){
		return __('入力形式が正しくありません','catpow');
	}
}

?>