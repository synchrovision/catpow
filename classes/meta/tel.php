<?php
namespace Catpow\meta;

class tel extends meta{
	
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val)){return $val;}
		if($prm==='text'){return $val;}
		return sprintf('<a class="tel" href="tel:%s">%s</a>',preg_replace('/\D/','',$val),$val);
	}
	public static function resolve_conf($conf){
		if(empty($conf['role'])){$conf['role']='tel';}
		return $conf;
	}
}
?>