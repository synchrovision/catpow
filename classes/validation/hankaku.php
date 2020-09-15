<?php
namespace Catpow\validation;

class hankaku extends pattern{
	public static $pattern='/^[a-zA-Z0-9\s]+$/';
	
	public static function get_message_format($conf){
		return __('半角英数で入力してください','catpow');
	}
}

?>