<?php
namespace Catpow\validation;
/**
* ユーザー入力の検証
* $confと$input_idを元に
* 入力検証で問題があれば$errorsにメッセージを追加する
*/

abstract class validation{
	public static
		$is_bulk=false,
		$message_keys=['label'];
	
	abstract public static function is_valid(&$val,$conf,$input_id);
	public static function validate($input_id,&$vals,$conf,&$errors){
		if(static::$is_bulk){
			if(!static::is_valid($vals,$conf,$input_id)){
				$errors[$input_id]=static::get_message($conf);
			}
		}
		else{
			if(is_array($vals)){
				foreach($vals as $id=>&$val){
					if(!static::is_valid($val,$conf,$input_id.\cp::INPUT_ID_DELIMITER.$id)){
						$errors[$input_id.\cp::INPUT_ID_DELIMITER.$id]=static::get_message($conf);
					}
				}
			}
		}
	}
	
	public static function get_message_format($conf){
		return __('%sの入力が正しくありません','catpow');
	}
	public static function get_message($conf){
		$class_name=get_called_class();
		$base_class_name=substr($class_name,strrpos($class_name,'\\')+1);
		$message=$conf['validation_message'][$base_class_name]??static::get_message_format($conf);
		$message_vals=[];
		foreach(static::$message_keys as $message_key){
			$message_vals[]=$conf[$message_key]??'';
		}
		return vsprintf($message,$message_vals);
	}
}

?>