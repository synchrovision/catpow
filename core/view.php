<?php
namespace Catpow;

function get_view_id(){
	static $view_id;
	if(empty($view_id)){
		if(isset($_COOKIE['cp_view_id'])){
			$view_id=$_COOKIE['cp_view_id'];
		}else{
			$view_id=rand(1,1000000000000000);
			while(get_view_meta($view_id,'_ip_',true))$view_id=random_int(1,1000000000000000);
			add_view_meta($view_id,'_ip_',$_SERVER['REMOTE_ADDR']);
			add_view_meta($view_id,'_ua_',$_SERVER['HTTP_USER_AGENT']);
			setcookie('cp_view_id',$view_id,strtotime('+30 days'),'/');
		}
	}
	return $view_id;
}
function get_views($key,$val){
	global $wpdb;
	return $wpdb->get_results("SELECT DISTINCT view_id FROM {$wpdb->viewmeta} WHERE meta_key = {$key} and meta_value = {$val}");
}

function get_view_conf(){
	static $conf;
	if(empty($conf)){
		if(isset($_SESSION['view_conf'])){
			$conf=$_SESSION['view_conf'];
		}
		else{
			$conf=get_view_meta(get_view_id(),'_conf_',true);
			$_SESSION['view_conf']=$conf;
		}
	}
	return $conf;
}
function update_view_conf($conf){
	$conf=array_merge((array)get_view_conf(),$conf);
	$_SESSION['view_conf']=$conf;
	update_view_meta(get_view_id(),'_conf_',$conf);
}
function delete_view_conf(){
	unset($_SESSION['view_conf']);
	delete_view_meta(get_view_id(),'_conf_','',true);
}


function get_view_log($view_id=false){
	if(empty($view_id))$view_id=get_view_id();
	return get_view_meta($view_id,'_log_');
}
function add_view_log($data){
	$view_id=get_view_id();
	$view_log=array(
		'time'=>time(),
		'session_id'=>session_id(),
		'uri'=>$_SERVER['REQUEST_URI'],
		'theme'=>get_stylesheet(),
		'content_path'=>cp::$content_path,
		'referer'=>isset($_SERVER['HTTP_REFERER'])?$_SERVER['HTTP_REFERER']:false,
		'prev'=>isset($_SESSION['view_log'])?$_SESSION['view_log']:false,
	);
	return $_SESSION['view_log']=add_view_meta($view_id,'_log_',array_merge($view_log,$data));
}

function get_view_log_data($view_id=false){
	if(empty($view_id))$view_id=get_view_id();
	static $view_log_data;
	if(!isset($view_log_data[$view_id])){
		if(!isset($view_log_data))$view_log_data=array();
		foreach(get_view_meta($view_id,'_log_') as $log){
			$session_id=$log['session_id'];
			if(!isset($view_log_data[$view_id]))$view_log_data[$view_id]=array();
			if(!isset($view_log_data[$view_id][$session_id]))$view_log_data[$view_id][$session_id]=array();
			$view_log_data[$view_id][$session_id][]=$log;
		}
	}
	return $view_log_data[$view_id];
}

/*アクセス解析*/
function get_the_PV($id=false){
	global $cp_loop_post_id;
	if($id===false)$id=$cp_loop_post_id;
	return get_post_meta($id,'_pv_',true)?:0;
}
function the_PV($id=false){
	echo(get_the_PV($id));
}


/*基本 view_meta*/
if(!empty($wpdb))$wpdb->viewmeta=$wpdb->prefix."viewmeta"; 

function add_view_meta($view_id,$name,$value,$unique=false){
	return add_metadata('view',$view_id,$name,$value,$unique);
}
function update_view_meta($view_id,$name,$value,$prev=''){
	return update_metadata('view',$view_id,$name,$value,$prev);
}
function delete_view_meta($view_id,$name,$value='',$delete_all=false){
	return delete_metadata('view',$view_id,$name,$value,$delete_all);
}
function get_view_meta($view_id,$name,$single=false){
	return get_metadata('view',$view_id,$name,$single);
}


?>