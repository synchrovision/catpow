<?php
/**
* 個体認証ID、IPアドレス、クッキーにより同一ユーザーによる重複処理や連続処理を防止する
* 同一IPから一定時間内にアクセスがあれば同じユーザーとみなし同じUIDを発行する
* 
*/
namespace Catpow;

class Auth{
	public $file,$log;
	public function __construct($file){
		$this->file=$file;
		
	}
	public static function get_uid(){
		if(isset($_SERVER['HTTP_X_DCMGUID'])){return $_SERVER['HTTP_X_DCMGUID']; }
		if(isset($_SERVER['HTTP_X_UP_SUBNO'])){return $_SERVER['HTTP_X_UP_SUBNO'];}
		if(isset($_SERVER['HTTP_X_JPHONE_UID'])){return $_SERVER['HTTP_X_JPHONE_UID'];}
		if(isset($_SERVER['HTTP_X_EM_UID'])){return $_SERVER['HTTP_X_EM_UID'];}
		if(isset($_COOKIE['CP_UID'])){return $_COOKIE['CP_UID'];}
		return $_SERVER['REMOTE_ADDR'];
	}
	public function update(){
		
	}
}


?>