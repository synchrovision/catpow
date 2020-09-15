<?php
namespace Catpow\meta;

class TreeSelect extends UI{
	static $ui='TreeSelect',$output_type='select',$defaultParam=['defaultLabel'=>'---'];
	public static function fill_param($prm,$meta){
		$prm=parent::fill_param($prm,$meta);
		$prm['selections']=static::get_selections($meta);
		return $prm;
	}
	public static function get_selections($meta){
		return ('Catpow\\meta\\'.static::$output_type)::get_selections($meta);
	}
}
?>