<?php
namespace Catpow;
do{
	if($attr['schedule']){
		$schedule=new util\schedule($attr['schedule']);
		if(!$schedule->includes('now')){break;}
	}
	if($attr['is_user_logged_in']==='-1' && is_user_logged_in()){break;}
	if($attr['is_user_logged_in']==='1' && !is_user_logged_in()){break;}
	if(!empty($attr['current_user_can'])){
		foreach(explode($attr['current_user_can']) as $cap){
			if($cap[0]==='!'){
				if(current_user_can(substr($cap,1))){break 2;}
				continue;
			}
			if(!current_user_can($cap)){break 2;}
		}
	}
	if($attr['user_value']){
		$cond=new util\cond($attr['user_value']);
		if(empty(this()) || $cond->test_content(this()->user())===false){break;}
	}
	if($attr['input_value']){
		$cond=new util\cond($attr['input_value']);
		if(empty(form()) || $cond->test_content(form())===false){break;}
	}
	if($attr['content_value']){
		$cond=new util\cond($attr['content_value']);
		if(empty(this()) || $cond->test_content(this())===false){break;}
	}
	echo $content;
}while(false);