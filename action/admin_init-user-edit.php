<?php
namespace Catpow;
global $pagenow;

add_action('profile_update',function($user_id){
	if(did_action('profile_update')>1){return;}
	if($form=cp::get_the_form()){
		try{
			$form->receive();
			$form->push();
			$form->clear();
		}
		catch(content\form_exception $e){
			if(isset($e->data['message'])){
				echo implode('<br/>',$e->data['message']);
				die();
			}
		}
	}
});
add_action(($pagenow==='profile.php')?'show_user_profile':'edit_user_profile',function($user){
	$role=reset($user->roles);
	$tmp_path='user/'.$role;

	wp_nonce_field('cp_form','_cp_form_nonce');
	wp_enqueue_script('cp_form');
	cp::enqueue_style('content.css');
	cp::enqueue_style('style.css');
	cp::enqueue_style($tmp_path.'/admin/style.css');
	cp::enqueue_script($tmp_path.'/admin/script.js');

	$sec=\cp::$content->sec($tmp_path.'/admin/form.php',$user->ID);
	printf('<input type="hidden" name="cp_form_section_id" value="%s"/>',$sec->form_id);
	$sec->render();
});
