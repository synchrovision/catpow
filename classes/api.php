<?php
namespace Catpow;
/**
* APIのエンドポイントのクラス
*/

abstract class api{
	public static 
		$method='GET',
		$check_nonce=false,
		$capability=false;
	public static function call($req,$res){
	}
	public static function permission($req){
		if(!empty(static::$method) && $req->get_method()!==static::$method){return false;}
		if(!empty(static::$check_nonce) && wp_verify_nonce($_REQUEST['nonce'],'cp_api')){return false;}
		if(!empty(static::$capability) && !current_user_can(static::$capability)){return false;}
		return true;
	}
	public static function get_data_name(){
		return substr(static::class,strrpos(static::class,'\\')+1);
	}
}

?>