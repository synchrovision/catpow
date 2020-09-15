<?php
namespace Catpow\meta;

class user_pass extends user_login{
	public static $input_type='password';
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		return false;
	}
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		return false;
	}
}
?>