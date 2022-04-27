<?php
namespace Catpow;
/**
* APIのエンドポイントのクラス
*/

abstract class api{
	public static 
		$method='GET',
		$check_nonce=false,
		$capability=false,
		$nonces=[],
		$did_register_nonce=false;
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
		if(!self::$did_register_nonce){
			\cp::enqueue_script('cp_rest_nonce');
			add_action(is_admin()?'admin_footer':'wp_footer',function(){
				wp_localize_script('cp_rest_nonce','cp_rest_nonces',self::$nonces);
			});
			self::$did_register_nonce=true;
		}
		self::$nonces[$action]=wp_create_nonce($action);
	}
	public static function get_data_name(){
		return substr(static::class,strrpos(static::class,'\\')+1);
	}
}

?>