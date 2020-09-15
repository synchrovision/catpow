<?php
namespace Catpow\gauth;

class cpgc{
	public static $gc;
	const TOKEN_NAME = 'gapi_token';
	
	public static function authenticate($code){
		$token=self::get_gc()->authenticate($code);
		unset($_SESSION[self::TOKEN_NAME]);
		if($token['error']){return false;}
		$_SESSION[self::TOKEN_NAME]=$token;
		return true;
	}
	
	public static function get_gc(){
		if(isset(self::$gc)){
			return self::$gc;
		}
		else{
			try{
				include(dirname(dirname(__DIR__)).'/vendor/autoload.php');
				
				$conf=get_option('gauth_conf')[0]??null;
				
				if(empty($conf)){return false;}

				self::$gc=new \Google_Client([
					'application_name'=>$conf['application_name'][0],
					'client_id'=>$conf['client_id'][0],
					'client_secret'=>$conf['client_secret'][0],
					'redirect_uri'=>self::get_login_callback_url()
				]);
				if(isset($_SESSION[self::TOKEN_NAME])){
					self::$gc->setAccessToken($_SESSION[self::TOKEN_NAME]);
				}
				elseif(is_user_logged_in()){
					if($token=get_user_meta(get_current_user_id(),self::TOKEN_NAME,true)){
						self::$gc->setAccessToken($token);
					}
				}
				self::$gc->setScopes($conf['scopes']);
			}
			catch(\Exception $e){
				return false;
			}
			return self::$gc;
		}
	}

	public static function get_login_url(){
		try{
			$gc=self::get_gc();
			if(empty($gc)){return false;}
			if(empty(session_id())){session_start();}
			$url=$gc->createAuthUrl();
			return $url;
		}
		catch(\Exception $e){
			return false;
		}
	}
	public static function get_login_callback_url(){
		return home_url('callback/gauth/login');
	}
	
	public static function req($method,$uri,$options=[]){
		static $c;
		if(!isset($c)){$c=self::get_gc()->getHttpClient();}
		$res=$c->request($method,add_query_arg(['access_token'=>self::get_gc()->getAccessToken()['access_token']],$uri),$options);
		return json_decode($res->getBody()->getContents(),true);
	}
}