<?php
add_action('cp_setup',function(){
	if(!current_user_can('administrator'))return;
	$cp_fake_user=true;
	if(is_admin()){
		global $pagenow;
		if($pagenow!='admin-ajax.php')$cp_fake_user=false;
		elseif(check_ajax_referer('cpform','_cpform_nonce',false))$cp_fake_user=false;
	}
	if(!apply_filters('cp_fake_user',$cp_fake_user))return;
	if(empty(cp::$data['fake_user_id']))return;
	wp_set_current_user(cp::$data['fake_user_id']);
});