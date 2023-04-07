<?php
namespace Catpow\meta;

class SelectTerms extends UI{
	static $ui='SearchSelect',$is_bulk_input=true,$output_type='checkbox_terms',$defaultParam=['defaultLabel'=>'---','multiple'=>true];
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		return checkbox_terms::get($data_type,$data_name,$id,$meta_name,$conf);
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		return checkbox_terms::set($data_type,$data_name,$id,$meta_name,$vals,$conf);
	}
	public static function fill_param($param,$meta){
		$param=parent::fill_param($param,$meta);
		$param['options']=checkbox_terms::get_selections($meta);
		return $param;
	}
}
?>