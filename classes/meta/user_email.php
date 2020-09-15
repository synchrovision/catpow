<?php
namespace Catpow\meta;

class user_email extends user_login{
	public static
		$input_type='email',
		$validation=['text','email','user_email'];
	public static function fill_conf(&$conf){
		$conf['size']=24;
	}
}
?>