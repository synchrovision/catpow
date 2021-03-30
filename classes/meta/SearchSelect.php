<?php
namespace Catpow\meta;

class SearchSelect extends UI{
	static $ui='SearchSelect',$output_type='select',$defaultParam=['defaultLabel'=>'---','col'=>5,'row'=>0,'placeholder'=>'検索'];
	public static function fill_param($prm,$meta){
		$prm=parent::fill_param($prm,$meta);
		$prm['selections']=static::get_selections($meta);
		return $prm;
	}
	public static function get_selections($meta){
		return ('Catpow\\meta\\'.static::$output_type)::get_selections($meta);
	}
	public static function resolve_conf($conf){
		$conf['value']=static::get_selections(new \Catpow\content\meta(['conf'=>$conf]));
		return $conf;
	}
}
?>