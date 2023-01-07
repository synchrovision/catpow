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
		if(!empty(static::$check_nonce) && !(wp_verify_nonce($_SERVER['HTTP_X_WP_NONCE']??'', 'wp_rest') && wp_verify_nonce($_SERVER['HTTP_X_CP_NONCE']??'',$req['data_type'].'/'.$req['data_name']))){return false;}
		if(!empty(static::$capability) && !current_user_can(static::$capability)){return false;}
		return true;
	}
	public static function register_nonce($action=null){
		if(!isset($action)){
			if(static::class === self::class){$action=\cp::$content->path;}
			else{$action=implode('/',array_slice(explode('\\',static::class),-2));}
		}
		\cp::enqueue_script('cpform.nonce');
		wp_add_inline_script('cpform.nonce',sprintf('Catpow.nonces["%s"]="%s";',$action,wp_create_nonce($action)));
	}
	public static function get_data_name(){
		return substr(static::class,strrpos(static::class,'\\')+1);
	}
}

?>