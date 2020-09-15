<?php
namespace Catpow\validation;

class email extends pattern{
	public static $pattern='/^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/';
	
	public static function get_message($conf){
		return __('メールアドレスを入力してください','catpow');
	}
}

?>