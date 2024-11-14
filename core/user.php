<?php
namespace Catpow;

/*action*/
add_action('user_register',function($id){
	cp::get_template_part('user/'.get_user_role($id).'/action/create',false,['user_id'=>$id]);
});
add_action('profile_update',function($id){
	cp::get_template_part('user/'.get_user_role($id).'/action/update',false,['user_id'=>$id]);
});
add_action('delete_user',function($id){
	cp::get_template_part('user/'.get_user_role($id).'/action/delete',false,['user_id'=>$id]);
});

function get_user($id=null){
	if(empty($id)){
		if(is_user_logged_in()){
			return wp_get_current_user();
		}
		elseif(isset(cp::$content) && $content=cp::$content->get_closest('user/*') && is_numeric($content->loop_id)){
			return get_userdata($content->loop_id);
		}
		return null;			
	}
	return get_userdata($id);
}
function get_the_user(){
	if(isset(cp::$content) && $content=cp::$content->get_closest('user/*')){
		$id=$content->loop_id;
	}
	else{$id=get_current_user_id();}
	return get_userdata($id);
}

function get_user_role($id=null){
	if(empty($user=get_user($id)) || empty($user->roles)){$role='guest';}
	else{$role=reset($user->roles);}
	return $role;
}
function get_user_role_label($id=null){
	global $user_datas;
	$role=get_user_role($id);
	if(isset($user_datas[$role]['label'])){
		return $role_name=$user_datas[$role]['label'];
	}
	return $role;
}
function get_user_role_level($id=null){
	if(empty($user=get_user($id))){return 0;}
	foreach(range(10,1) as $i){
		if($user->has_cap('level_'.$i)){return $i;}
	}
	return 0;
}

function get_user_display_name($id=null){
	if($user=get_user($id)){return $user->display_name;}
	return __('ゲスト','catpow');
}



?>