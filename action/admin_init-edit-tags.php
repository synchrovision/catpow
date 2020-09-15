<?php
namespace Catpow;

add_action('edited_term',function($term_id,$tt_id,$taxonomy){
	if($form=cp::get_the_form()){
		$form->receive();
		\cp::update_data($form->inputs->data,'term/'.$taxonomy.'/'.$term_id);
	}
},10,3);
