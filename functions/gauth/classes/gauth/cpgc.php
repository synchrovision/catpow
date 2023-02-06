<?php
namespace Catpow\gauth;

class cpgc{
	public static $gc;
	const TOKEN_NAME='gapi_token',USER_NAME_KEY='gapi_user_name',ID_KEY='_google_id';
	
	public static function authenticate($code){
		$token=self::get_gc()->authenticate($code);
		unset($_SESSION[self::TOKEN_NAME]);
		if($token['error']){return false;}
		$_SESSION[self::TOKEN_NAME]=$token;
		if(is_user_logged_in()){update_user_meta(get_current_user_id(),self::TOKEN_NAME,$token);}
		return true;
	}
	
	public static function get_gc(){
		if(isset(self::$gc)){
			return self::$gc;
		}
		else{
			try{
				$conf=get_option('gauth_conf')??null;
				
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
	public static function login(){
		if(!empty(self::get_gc()->getAccessToken()['error'])){
			return false;
		}
		$user_data=self::req('GET','oauth2/v1/userinfo');

		$gid=$user_data['id'];
		$q=new \WP_User_Query(['meta_query'=>[
			['key'=>self::ID_KEY,'value'=>$gid]
		]]);
		if($q->get_total()==0){
			if(is_user_logged_in()){
				$uid=get_current_user_id();
			}
			else{
				if($user=get_user_by('email',$user_data['email'])){
					$uid=$user->ID;
				}
				else{
					$uid=wp_insert_user([
						'user_pass'=>wp_generate_password(),
						'user_login'=>$user_data['name'],
						'user_email'=>$user_data['email'],
						'first_name'=>$user_data['given_name'],
						'last_name'=>$user_data['family_name']
					]);
				}
				wp_set_auth_cookie($uid);
			}
			add_user_meta($uid,self::ID_KEY,$gid,true);
		}
		else{
			$users=$q->get_results();
			$uid=reset($users)->ID;
			wp_set_auth_cookie($uid);
		}
		return $uid;
	}
	
	public static function req($method,$uri,$options=[]){
		static $c;
		if(!isset($c)){$c=self::get_gc()->getHttpClient();}
		$res=$c->request($method,add_query_arg(['access_token'=>self::get_gc()->getAccessToken()['access_token']],$uri),$options);
		return json_decode($res->getBody()->getContents(),true);
	}
}