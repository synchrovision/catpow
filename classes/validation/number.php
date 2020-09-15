<?php
namespace Catpow\validation;

class number extends pattern{
	public static  $pattern='/^[0-9\-]+$/';
	
	public static function get_message_format($conf){
		return __('数字で入力してください','catpow');
	}
}

?>