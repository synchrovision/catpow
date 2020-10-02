<?php
namespace Catpow\meta;

class SelectIcon extends UI{
	static $ui='SelectPreparedImage';
	public static function output($meta,$prm){
		$val=$meta->value;
		if($prm=='url'){return $val;}
		return sprintf('<img src="%s" alt=""/>',$val);
	}
	public static function fill_param($prm,$meta){
		$prm=parent::fill_param($prm,$meta);
		$prm['type']='icon';
		return $prm;
	}
}
?>