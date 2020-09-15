<?php
use Catpow\gauth\cpgc;

cpgc::authenticate($_GET['code']);

if(empty(cpgc::get_gc()->getAccessToken()['error'])){
	$user_data=cpgc::req('GET','oauth2/v1/userinfo');
	
	$gid=$user_data['id'];
	$q=new WP_User_Query(['meta_query'=>[
		['key'=>'_google_id','value'=>$gid]
	]]);
	if($q->get_total()==0){
		if(is_user_looged_in()){
			$uid=get_current_user_id();
		}
		else{
			$uid=wp_insert_user([
				'user_pass'=>wp_generate_password(),
				'user_login'=>$user_data['name'],
				'user_email'=>$user_data['email'],
				'first_name'=>$user_data['given_name'],
				'last_name'=>$user_data['family_name']
			]);
			wp_set_auth_cookie($uid);
		}
		add_user_meta($uid,'_google_id',$gid,true);
	}else{
		$users=$q->get_results();
		$uid=reset($users)->ID;
		wp_set_auth_cookie($uid);
	}
}
wp_redirect(home_url());
exit;