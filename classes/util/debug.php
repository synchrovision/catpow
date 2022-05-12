<?php
/**
* デバッグ用のメソッド
*/
namespace Catpow\util;
class debug{
	
	public static function log($log=false){
		static $logs,$req_mtime,$prev_mtime;
		if(!isset($logs)){
			$logs=array();
			$req_mtime=$_SERVER['REQUEST_TIME_FLOAT'];
			$prev_mtime=$req_mtime;
		}
		if($log===false){_d($logs);}
		else{
			$mtime=microtime(true);
			error_log(sprintf("degug: 0.%04d 0.%04d %s",($mtime-$req_mtime)*10000,($mtime-$prev_mtime)*10000,$log));
			$logs[(string)($mtime-$req_mtime)]=$log;
			$prev_mtime=$mtime;
		}
	}
	public static function counter($id,$val=0,$ope='+'){
		static $data;
		if(empty($data))$data=array();
		if(empty($data[$id]))$data[$id]=0;
		switch($ope){
			case '+':$data[$id]+=(int)$val;break;
			case '-':$data[$id]-=(int)$val;break;
			case '*':$data[$id]*=(int)$val;break;
			case '/':$data[$id]/=(int)$val;break;
		}
		return $data[$id];
	}

}

?>