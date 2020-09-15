<?php
namespace Catpow\validation;

class color extends pattern{
	public static $pattern='/^#[0-9a-fA-F]{3,8}$/';
	
	public static function get_message_format($conf){
		return __('色指定をHEX値で入力して下さい','catpow');
	}
}

?>