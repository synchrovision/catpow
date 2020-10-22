<?php
/**
* デバッグ用のメソッド
*/
namespace Catpow\util;
class debug{
	
	public static function log($log=false){
		static $logs,$req_mtime;
		if(!isset($logs)){
			$logs=array();
			$req_mtime=$_SERVER['REQUEST_TIME_FLOAT'];
		}
		if($log===false){_d($logs);}
		else{$logs[(string)(microtime(true)-$req_mtime)]=$log;}
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