<?php
namespace Catpow\meta;

class todouhuken extends select_json{
	
	public static function fill_conf(&$conf){
		$conf['value']='todouhuken';
	}
	public static function resolve_conf($conf){
		if(empty($conf['role'])){$conf['role']='prefecture';}
		return $conf;
	}
}
?>