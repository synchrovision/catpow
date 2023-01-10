<?php
include __DIR__.'/../classes/CP_data_stock_min.php';

function cp_stock_get(){
	global $cp_data_stock,$cp_data_stock_name;
	$args=func_get_args();
	array_unshift($args,$cp_data_stock_name);
	return call_user_func_array([$cp_data_stock,'get'],$args);
}
function cp_stock_set(){
	global $cp_data_stock, $cp_data_stock_name;
	$args=func_get_args();
	array_unshift($args,$cp_data_stock_name);
	return call_user_func_array([$cp_data_stock,'set'],$args);
}

function cp_thread_get_dir(){
	global $dir,$cp_loop_thread_id;
	return $dir.'/thread/'.$cp_loop_thread_id;
}

function cp_thread_get_info($rsp='cp'){
	$dir=cp_thread_get_dir();
	$f=$dir.'/'.$rsp.'_info.php';
	if(file_exists($f)){include $f;}
	else{dir_create($dir);$info=0;}
	return $info;
}
function cp_thread_set_info($info,$rsp='cp'){
	$dir=cp_thread_get_dir();
	$f=$dir.'/'.$rsp.'_info.php';
	if(!file_exists($f)){dir_create($dir);}
	$str.="<?php\n\$info=".var_export($info,true).';';
	file_put_contents($f,$str);
	return $info;
}
function cp_thread_ping(){
	global $cp_loop_thread_id;
	$ping=cp_stock_get('cp_thread',$cp_loop_thread_id,'ping');
	if($ping===false){$ping=0;}
	if($ping%20===0){
		$info=cp_thread_get_info();
		$now=time();
		$threshold1=$now-30;
		$threshold2=$now-300;
		$uid=cp_stock_get('cp_thread',$cp_loop_thread_id,'uid');
		if($uid===false){
			$uid=uniqid();
			cp_stock_set('cp_thread',$cp_loop_thread_id,'uid',$uid);
		}
		if(!isset($info['user'][$uid])){
			$info['users'][$uid]=[
				'ping'=>$now,
				'name'=>'guest',
				'cap'=>0,
				'status'=>1,
			];
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
	}
	$ping++;
	cp_stock_set('cp_thread',$cp_loop_thread_id,'ping',$ping);
}

function cp_thread_add_task($fnc,$arg,$rsp='cp'){
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
function cp_thread_add_tasks($fnc,$args,$rsp='cp'){
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

function cp_thread_has_update($rsp='cp'){
	$f=cp_thread_get_dir().'/'.$rsp.'_index.php';
	if(!file_exists($f)){return false;}
	include $f;
	return $index>=cp_thread_get_index($rsp);
}
function cp_thread_do_task($rsp='cp'){
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

function cp_thread_set_index($i=1,$rsp='cp'){
	global $cp_loop_thread_id;
	if($i<1){
		$i=cp_thread_get_last_index($rsp)+$i;
		if($i<1){$i=1;}
	}
	cp_stock_set('cp_thread',$cp_loop_thread_id,$rsp.'_index',$i);
}
function cp_thread_get_index($rsp='cp'){
	global $cp_loop_thread_id;
	$i=cp_stock_get('cp_thread',$cp_loop_thread_id,$rsp.'_index');
	if($i===false){$i=1;}
	return $i;
}

function cp_thread_get_last_index($rsp='cp'){
	$dir=cp_thread_get_dir();
	$if=$dir.'/'.$rsp.'_index.php';
	if(file_exists($if)){include $if;}
	else{dir_create($dir);$index=0;}
	return $index;
}
function cp_thread_set_last_index($i=0,$rsp='cp'){
	$dir=cp_thread_get_dir();
	$if=$dir.'/'.$rsp.'_index.php';
	if(!file_exists($if)){dir_create($dir);}
	return file_put_contents($if,sprintf('<?php $index=%d; ?>',$i));
}

function cp_thread_set_response($param){
	global $response;
	$response=$param;
}

try{
	global $catpow_dir,$dir,$response,$form_id,$cp_loop_thread_id,$cpform_is_section_request;
	$catpow_dir=__DIR__;
	assert(isset($_REQUEST['cp_data_stock_name']),'requier cp_data_stock_name');
	assert(isset($_REQUEST['cpform_id']) || isset($_REQUEST['cpform_section_id']),'requier cpform_id');
	$cp_data_stock_name=$_REQUEST['cp_data_stock_name'];
	$cpform_is_section_request=isset($_REQUEST['cpform_section_id']);
	if($cpform_is_section_request){$form_id=$_REQUEST['cpform_section_id'];}
	else{$form_id=$_REQUEST['cpform_id'];}
	$dir=cp_stock_get('_dir',$form_id);
	$cp_loop_thread_id=cp_stock_get('_loop_shift',$form_id,'cp_loop_thread_id');
	assert($dir!==false,'data is not exists');
	$response=[];
	ob_start();
	include $dir.'/tick.php';
	$html=ob_get_clean();
	if($html){
		$response['html']=$html;
		if(!isset($response['callback'])){
			$response['callback']=$cpform_is_section_request?'cpform_append_section_log':'cpform_append_log';
		}
	}
	cp_thread_ping();
	die(json_encode($response));
}
catch(Exception $e){
	die($e->getMessage());
}

?>