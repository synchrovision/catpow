<?php
namespace Catpow\meta;

class email extends meta{
	public static
		$validation=['email'];
	public static function fill_conf(&$conf){
		$conf['size']=24;
	}
	public static function resolve_conf($conf){
		if(empty($conf['role'])){$conf['role']='email';}
		return $conf;
	}
}
?>