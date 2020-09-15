<?php
add_filter('cp_loop_shift_params',function($params){
	$params['cp_loop_thread_id']=session_id();
	return $params;
});

function cp_thread_exists($thread_id=false){
	global $cp_content_path;
	if($thread_id===false){
		global $cp_loop_thread_id;
		$thread_id=$cp_loop_thread_id;
	}
	return file_exists(STYLESHEETPATH.'/'.$cp_content_path.'/thread/'.basename($thread_id));
}

function cp_thread_get_dir(){
	global $cp_content_path,$cp_loop_thread_id;
	return STYLESHEETPATH.'/'.$cp_content_path.'/thread/'.basename($cp_loop_thread_id);
}

function cp_thread_get_info($rsp='wp'){
	$dir=cp_thread_get_dir();
	$f=$dir.'/'.$rsp.'_info.php';
	if(file_exists($f)){include $f;}
	else{dir_create($dir);$info=[];}
	return $info;
}
function cp_thread_set_info($info,$rsp='wp'){
	$dir=cp_thread_get_dir();
	$f=$dir.'/'.$rsp.'_info.php';
	if(!file_exists($f)){dir_create($dir);}
	$str="<?php\n\$info=".var_export($info,true).';';
	file_put_contents($f,$str);
	return $info;
}
function cp_thread_set_user_info($user_info=false){
	global $cp_loop_thread_id;
	$info=cp_thread_get_info();
	$uid=cp_stock_get('cp_thread',$cp_loop_thread_id,'uid');
	if($uid===false){
		$uid=uniqid();
		cp_stock_set('cp_thread',$cp_loop_thread_id,'uid',$uid);
	}
	if(!isset($info['users'][$uid]) || $user_info===false){
		$info['users'][$uid]=[
			'ping'=>time(),
			'name'=>get_user_display_name(),
			'cap'=>get_user_role_level(),
			'status'=>1
		];
	}
	if($user_info!==false){$info['users'][$uid]=array_merge($info['users'][$uid],$user_info);}
	return cp_thread_set_info($info);
}
function cp_thread_ping(){
	global $cp_loop_thread_id;
	$ping=cp_stock_get('cp_thread',$cp_loop_thread_id,'ping');
	if($ping===false){$ping=0;}
	$info=cp_thread_get_info();
	$now=time();
	$threshold1=$now-60;
	$threshold2=$now-1800;
	$uid=cp_stock_get('cp_thread',$cp_loop_thread_id,'uid');
	if($uid===false){
		$uid=uniqid();
		cp_stock_set('cp_thread',$cp_loop_thread_id,'uid',$uid);
	}
	if(!isset($info['users'][$uid])){
		$info=cp_thread_set_user_info();
	}
	else{
		$info['users'][$uid]['ping']=$now;
		$info['users'][$uid]['status']=1;
	}
	foreach($info['users'] as $uid=>&$user){
		if($user['ping']<$threshold1){
			$user['status']=0;
			if($user['ping']<$threshold2){
				unset($info['users'][$uid]);
			}
		}
	}
	cp_thread_set_info($info);
	cp_stock_set('cp_thread',$cp_loop_thread_id,'ping',$ping);
}

function cp_thread_add_task($fnc,$arg,$rsp='wp'){
	$dir=cp_thread_get_dir();
	$index=cp_thread_get_last_index($rsp);
	$index++;
	$str="<?php\n\$fnc='{$fnc}';\n\$arg=";
	ob_start();
	var_export($arg);
	$str.=ob_get_clean().';';
	file_put_contents($dir.'/'.$rsp.'_'.$index.'.php',$str);
	cp_thread_set_last_index($index,$rsp);
}
function cp_thread_add_tasks($fnc,$args,$rsp='wp'){
	$dir=cp_thread_get_dir();
	$index=cp_thread_get_last_index($rsp);
	foreach($args as $arg){
		$index++;
		$str="<?php\n\$fnc='{$fnc}';\n\$arg=";
		ob_start();
		var_export($arg);
		$str.=ob_get_clean().';';
		file_put_contents($dir.'/'.$rsp.'_'.$index.'.php',$str);
	}
	cp_thread_set_last_index($index,$rsp);
}

function cp_thread_has_update($rsp='wp'){
	$f=cp_thread_get_dir().'/'.$rsp.'_index.php';
	if(!file_exists($f)){return false;}
	include $f;
	return $index>=cp_thread_get_index($rsp);
}
function cp_thread_do_task($rsp='wp'){
	global $cp_loop_thread_id;
	$i=cp_thread_get_index($rsp);
	if($i===false){$i=1;}
	$f=cp_thread_get_dir().'/'.$rsp.'_'.$i.'.php';
	if(file_exists($f)){
		include $f;
		$rtn=call_user_func_array($fnc,$arg);
		cp_thread_set_index($i+1,$rsp);
		return $rtn;
	}
	else{
		return false;
	}
}

function cp_thread_set_index($i=1,$rsp='wp'){
	global $cp_loop_thread_id;
	if($i<1){
		$i=cp_thread_get_last_index($rsp)+$i;
		if($i<1){$i=1;}
	}
	cp_stock_set('cp_thread',$cp_loop_thread_id,$rsp.'_index',$i);
}
function cp_thread_get_index($rsp='wp'){
	global $cp_loop_thread_id;
	return cp_stock_get('cp_thread',$cp_loop_thread_id,$rsp.'_index');
}

function cp_thread_get_last_index($rsp='wp'){
	$dir=cp_thread_get_dir();
	$if=$dir.'/'.$rsp.'_index.php';
	if(file_exists($if)){include $if;}
	else{dir_create($dir);$index=0;}
	return $index;
}
function cp_thread_set_last_index($i=0,$rsp='wp'){
	$dir=cp_thread_get_dir();
	$if=$dir.'/'.$rsp.'_index.php';
	if(!file_exists($if)){dir_create($dir);}
	return file_put_contents($if,sprintf('<?php $index=%d; ?>',$i));
}

function cp_thread_destroy(){
	global $cp_loop_thread_id;
	dir_delete(cp_thread_get_dir());
	cp_stock_remove('cp_thread',$cp_loop_thread_id);
}
?>