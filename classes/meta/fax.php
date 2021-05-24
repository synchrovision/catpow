<?php
namespace Catpow\meta;

class fax extends meta{
	
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val)){return $val;}
		return sprintf('<span class="fax">%s</a>',$val);
	}
	public static function resolve_conf($conf){
		if(empty($conf['role'])){$conf['role']='fax';}
		return $conf;
	}
}
?>