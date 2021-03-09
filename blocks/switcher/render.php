<?php
namespace Catpow;
preg_match_all(
	'|<switcherContent cond="(?P<cond>.+?)">(?P<content>.*?)</switcherContent>|s',
	$content,
	$matches,
	PREG_SET_ORDER
);
$contents=array_column($matches,null,'cond');

switch($attr['factor']){
	case 'schedule':
		$cond_cb=function($value){
			$schedule=new util\schedule($value);
			return $schedule->includes('now');
		};
		break;
	case 'is_user_logged_in':
		$cond_cb=function($value){
			return is_user_logged_in() === ($value == 1);
		};
		break;
	case 'current_user_can':
		$cond_cb='current_user_can';
		break;
	case 'user_value':
		$cond_cb=function($value)use($attr){
			$cond=new util\cond($attr['field'].' '.$attr['compare'].' '.$value);
			return !empty(this()) && $cond->test_content(this()->user());
		};
		break;
	case 'input_value':
		$cond_cb=function($value)use($attr){
			$cond=new util\cond($attr['field'].' '.$attr['compare'].' '.$value);
			return !empty(form()) && $cond->test_content(form());
		};
		break;
	case 'content_value':
		$cond_cb=function($value)use($attr){
			$cond=new util\cond($attr['field'].' '.$attr['compare'].' '.$value);
			return !empty(this()) && $cond->test_content(this());
		};
		break;
	default:return;
}
foreach($contents as $value=>$data){
	if($cond_cb($value)){echo $data['content'];return;}
}