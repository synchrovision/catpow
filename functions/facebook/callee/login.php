<?php
use Catpow\facebook\cpfb;
session_start();

$fb=cpfb::get_fb();
$helper = $fb->getRedirectLoginHelper();

try {
	$accessToken = $helper->getAccessToken();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
	echo 'Graph returned an error: '.$e->getMessage();
} catch(Facebook\Exceptions\FacebookSDKException $e) {
	echo 'Facebook SDK returned an error: '.$e->getMessage();
}

if (isset($accessToken)) {
	$_SESSION['fb_access_token']=$accessToken->getValue();
	$user_data=$fb->get('/me?locale=en&fields=email,name,picture,first_name,last_name,name_format,public_key',$accessToken)->getDecodedBody();
	$fid=$user_data['id'];
	$q=new WP_User_Query(['meta_query'=>[
		['key'=>'_facebook_id','value'=>$fid]
	]]);
	if($q->get_total()==0){
		if(is_user_logged_in()){
			$uid=get_current_user_id();
		}
		else{
			$uid=wp_insert_user([
				'user_pass'=>wp_generate_password(),
				'user_login'=>$user_data['name'],
				'user_email'=>$user_data['email'],
				'first_name'=>$user_data['first_name'],
				'last_name'=>$user_data['last_name']
			]);
			wp_set_auth_cookie($uid);
		}
		add_user_meta($uid,'_facebook_id',$fid,true);
		add_user_meta($uid,'avater_url',$user_data['picture']['data']['url'],true);
		add_user_meta($uid,'_facebook_access_token',$accessToken->getValue(),true);
	}else{
		$users=$q->get_results();
		$uid=reset($users)->ID;
		wp_set_auth_cookie($uid);
	}
}
wp_redirect(home_url());
exit;