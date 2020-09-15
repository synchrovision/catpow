<?php
namespace Catpow\facebook;

class cpfb{
	
	public static function parts($type,$param=false){
		printf('<div class="fb-%s"',$type);
		foreach((array)$param as $key=>$val){if(is_null($val))continue;printf(' data-%s="%s"',$key,$val);}
		echo('></div>');
	}

	public static function like($param=false){
		$default_param=array(
			'href'=>null,
			'send'=>false,
			'layout'=>'button_count',//[standard|button_count|button|box_count]
			'action'=>'like',//[like|recommend]
			'share'=>false,
			'colorscheme'=>'light',//[dark|light]
			'kid_directed_site'=>false,
			'width'=>100,
			'show-faces'=>false,
			'ref'=>null
		);
		self::parts('like',array_merge($default_param,(array)$param));
	}
	public static function share($param=false){
		$default_param=array(
			'href'=>null,
			'layout'=>'button_count',//[icon_link|box_count|button_count|button]
			'size'=>'small',//[small|large]
			'mobile_iframe'=>false
		);
		self::parts('share-button',array_merge($default_param,(array)$param));
	}
	public static function page($href,$param=false){
		$default_param=array(
			'href'=>$href,
			'width'=>300,//180~500
			'height'=>400,//70~
			'tabs'=>'timeline',//[timeline,events,messages]
			'hide_cover'=>true,
			'show_facepile'=>false,
			'hide_cta'=>false,
			'small_header'=>true,
			'adapt_container_width'=>true
		);
		self::parts('page',array_merge($default_param,(array)$param));
	}

	public static function get_fb(){
		static $fb;
		if(!isset($fb)){
			include_once(dirname(__DIR__).'/vendor/Facebook/autoload.php');
			try{
				$args=[
					'app_id'=>get_option('fb_app_id')[0],
					'app_secret'=>get_option('fb_app_secret')[0],
					'default_graph_version' => 'v3.2',
				];
				if(empty($args['app_id']) || empty($args['app_secret'])){return false;}
				$fb=new \Facebook\Facebook($args);
			}catch(Exception $e){
				return false;
			}
		}
		return $fb;
	}

	public static function get_login_url(){
		$fb=self::get_fb();
		if(empty($fb)){return false;}
		session_start();
		return $fb->getRedirectLoginHelper()->getLoginUrl(
			self::get_login_callback_url(),
			array('public_profile','email')
		);
	}
	public static function get_login_callback_url(){
		return home_url('callback/facebook/login');
	}
	public static function get_logout_url(){
		$fb=self::get_fb();
		if(empty($fb)){return false;}
		session_start();
		return $fb->getRedirectLoginHelper()->getLogoutUrl(
			$access_token,
			self::get_login_callback_url()
		);
	}
	public static function get_logout_callback_url(){
		return home_url('callback/facebook/logout');
	}
}