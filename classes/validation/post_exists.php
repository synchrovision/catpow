<?php
namespace Catpow\validation;

class post_exists extends validation{
	
	public static function is_valid(&$val,$conf,$input_id){
		return get_post_status($val)!==false;
	}
	public static function get_message_format($conf){
		return __('投稿が存在しません','catpow');
	}
}

?>