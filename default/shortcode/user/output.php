<?php
namespace Catpow;
$prm=shortcode_atts([0=>'name'],$atts);
$user=get_user();
switch($prm[0]){
	case 'id':echo $user->ID;break;
	case 'name':echo $user->display_name;break;
	case 'login':echo $user->user_login;break;
	case 'email':echo $user->user_email;break;
	case 'role':echo $GLOBALS['user_datas'][reset($user->roles)]['label'];break;
	case 'lost_password_url':echo wp_lostpassword_url();break;
	case 'reset_password_url':echo util\user::get_reset_password_url($user);break;
	case 'loop':
		if(cp::$content && !empty($content)){
			foreach(cp::$content->user($user->ID)->loop() as $obj){
				echo do_shortcode($content);
			}
		}
		break;
	default:
		echo get_user_meta($user->ID,$prm[0],true);
}