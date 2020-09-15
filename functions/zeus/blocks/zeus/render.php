<?php
$form=\cp::$content->form;
if(empty($form)){return 'block Zeus must be in Form';}
$form->allow_action($attr['action']);
$agent=Catpow\zeus\Agent::getInstance();
$agent->renderButton([
	'action'=>$attr['action'],
	'text'=>$attr['text']
]);