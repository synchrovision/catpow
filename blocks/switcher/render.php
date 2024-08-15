<?php
namespace Catpow;
preg_match_all(
	'|<switcherContent cond="(?P<cond>.+?)">(?P<content>.*?)</switcherContent>|s',
	$content,
	$matches,
	PREG_SET_ORDER
);
$contents=array_column($matches,null,'cond');
if(isset($contents['default'])){
	$default_content=$contents['default'];
	unset($contents['default']);
}
switch($attr['factor']){
	case 'schedule':
		$cond_cb=function($value){
			$schedule=new util\schedule($value);
			return $schedule->includes('now');
		};
		break;
	case 'is_user_logged_in':
		$cond_cb=function($value){
			return is_user_logged_in() === in_array($value,[1,'in','true']);
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
	case 'ab_test':
		$key='cp_user_property_'.$attr['field'];
		$values=explode("\n",trim($attr['values']));
		if(!isset($_COOKIE[$key]) || !in_array($_COOKIE[$key],$values)){
			$user_property=$values[array_rand($values)];
			setcookie($key,$user_property,strtotime('+ 1 year'));
			$_COOKIE[$key]=$user_property;
		}
		else{
			$user_property=$_COOKIE[$key];
		}
		do_action('cp_set_user_properties',[$attr['field']=>$user_property]);
		$cond_cb=function($value)use($user_property){
			return $value===$user_property;
		};
		break;
	default:return;
}
foreach($contents as $value=>$data){
	if($cond_cb($value)){echo $data['content'];return;}
}
echo $default_content['content'];