<?php
namespace Catpow\validation;

class text extends validation{
	public static function is_valid(&$val,$conf,$input_id){
		$val=mb_convert_kana(_h($val),'aKV');
		return true;
	}
	public static function get_message_format($conf){
		return __('不正な値です','catpow');
	}
}

?>