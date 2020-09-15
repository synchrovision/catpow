<?php
namespace Catpow\validation;

class user_email extends validation{
	public static function is_valid(&$val,$conf,$input_id){
		if(email_exists($val)==false)return true;
		
		$path_data=\cp::parse_input_id($input_id);
		
		$user_data=get_userdata($path_data['data_id']);
		
		if($user_data && $user_data->user_email==$val){return true;}
		return false;
	}
	public static function get_message_format($conf){
		return __('このメールアドレスはすでに使われています','catpow');
	}
}

?>