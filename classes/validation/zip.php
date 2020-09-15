<?php
namespace Catpow\validation;

class zip extends pattern{
	public static $pattern='/^[0-9]{3}-?[0-9]{4}$/';
	public static function get_message_format($conf){
		return __('郵便番号を入力してください（半角数字）','catpow');
	}
}

?>