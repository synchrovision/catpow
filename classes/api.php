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
		if(!empty(static::$check_nonce) && !(wp_verify_nonce($_SERVER['HTTP_X_WP_NONCE'], 'wp_rest') && wp_verify_nonce($_SERVER['HTTP_X_CP_NONCE'],$req['data_type'].'/'.$req['data_name']))){return false;}
		if(!empty(static::$capability) && !current_user_can(static::$capability)){return false;}
		return true;
	}
	public static function register_nonce($action=null){
		static $is_first=true,$nonces=[];
		if(!isset($action)){$action=\cp::$content->path;}
		if($is_first){
			\cp::enqueue_script('cp_rest_nonce');
			add_action(is_admin()?'admin_footer':'wp_footer',function()use(&$nonces){
				wp_localize_script('cp_rest_nonce','cp_rest_nonces',$nonces);
			});
			$is_first=false;
		}
		$nonces[$action]=wp_create_nonce($action);
	}
	public static function get_data_name(){
		return substr(static::class,strrpos(static::class,'\\')+1);
	}
}

?>