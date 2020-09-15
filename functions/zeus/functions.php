<?php


add_shortcode('Zeus',function($atts){
	$atts=shortcode_atts(['action'=>'zeus'],$atts,'Zeus');
	$form=\cp::$content->form;
	if(empty($form)){return 'shortcode Zeus must be in Form';}
	$action=$atts['action'];
	$form->allow_action($action);
	ob_start();
	$agent=Catpow\zeus\Agent::getInstance();
	$agent->renderButton([
		'action'=>$action
	]);
	return ob_get_clean();
});