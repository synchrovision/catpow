<?php


add_shortcode('AmazonPay',function($atts){
	$atts=shortcode_atts(['action'=>'amazonpay'],$atts,'AmazonPay');
	$form=\cp::$content->form;
	if(empty($form)){return 'shortcode AmazonPay must be in Form';}
	$action=$atts['action'];
	$form->allow_action($action);
	ob_start();
	$agent=Catpow\amazonpay\Agent::getInstance();
	$agent->renderButton([
		'action'=>$action
	]);
	return ob_get_clean();
});