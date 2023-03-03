<?php
namespace Catpow\instagram;

class cpig{
	const USERS_KEY='ig_users';
	
	// settings
	public static function register_settings(){
		\register_setting('options',self::USERS_KEY,[
			'type'=>'array',
			'show_in_rest'=>[
				'name'=>self::USERS_KEY,
				'schema'=>[
					'type'=>'array',
					'items'=>[
						'type'=>'object',
						'properties'=>[
							'id'=>['type'=>'integer'],
							'username'=>['type'=>'string'],
							'access_token'=>['type'=>'string']
						]
					]
				]
			]
		]);
	}
	
	// auth
	public static function authenticate($code){
		$res=self::req('post','https://api.instagram.com/oauth/access_token',[
			'client_id'=>self::get_conf('app_id'),
			'client_secret'=>self::get_conf('app_secret'),
			'grant_type'=>'authorization_code',
			'redirect_uri'=>self::get_register_callback_url(),
			'code'=>$code
		]);
		if(!empty($res['error'])){return false;}
		$token=$res['access_token'];
		$user_id=$res['user_id'];
		$user_data=self::req('get','https://graph.instagram.com/me',[
			'fields'=>'id,username',
			'access_token'=>$res['access_token']
		]);
		$token=self::exchange_token($token);
		$user_data['access_token']=$token;
		self::update_user($user_data);
		return true;
	}
	
	// user
	public static function get_users(){
		return array_column(get_option(self::USERS_KEY,[]),null,'id');
	}
	public static function set_users($users){
		return update_option(self::USERS_KEY,array_values($users));
	}
	public static function update_user($user){
		$users=self::get_users();
		$users[$user['id']]=$user;
		return self::set_users($users);
	}
	public static function remove_user($id){
		$users=self::get_users();
		unset($users[$id]);
		return self::set_users($users);
	}
	
	// url
	public static function get_register_url($state=1){
		if(
			empty(self::get_conf('app_id')) || 
			empty(self::get_conf('app_id')) ||
			empty(self::get_conf('scopes'))
		){return false;}
		return sprintf('https://api.instagram.com/oauth/authorize/?%s',http_build_query([
			'client_id'=>self::get_conf('app_id'),
			'scope'=>self::get_conf('scopes'),
			'redirect_uri'=>self::get_register_callback_url(),
			'response_type'=>'code',
			'state'=>$state
		]));
	}
	public static function get_register_callback_url(){
		return home_url('callback/instagram/register');
	}
	
	// access token
	public static function exchange_token($token){
		if(empty($token)){return false;}
		$res=self::req('get','https://graph.instagram.com/access_token',[
			'grant_type'=>'ig_exchange_token',
			'client_secret'=>self::get_conf('app_secret'),
			'access_token'=>$token
		]);
		if($res['error']){return false;}
		return $res['access_token'];
	}
	public static function reflesh_token($token){
		if(empty($token)){return false;}
		$res=self::req('get','https://graph.instagram.com/access_token',[
			'grant_type'=>'ig_refresh_token',
			'access_token'=>$token
		]);
		if($res['error']){return false;}
		return $res['access_token'];
	}
	
	// request
	public static function req($method,$uri,$param){
		$method=strtoupper($method);
		$data=http_build_query($param);
		$options=['http'=>[
			'method'=>$method,
			'header'=>"Content-Type: application/x-www-form-urlencoded"
		]];
		if($method==='POST'){
			$options['http']['content']=$data;
			$options['http']['header'].=sprintf("\r\nContent-Length: %d",strlen($data));
		}
		else{
			$uri.='?'.$data;
		}
		return json_decode(file_get_contents($uri,false,stream_context_create($options)),true);
	}
	
	// conf
	public static function get_conf($key=null){
		static $conf;
		if(!isset($conf)){$conf=get_option('instagram_conf',[]);}
		if(empty($key)){return $conf;}
		if(empty($conf[$key])){return null;}
		if(is_array($conf[$key])){return implode(',',$conf[$key]);}
		return $conf[$key];
	}
}