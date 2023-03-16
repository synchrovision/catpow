<?php
namespace Catpow\meta;

class SelectTerms extends UI{
	static $ui='SearchSelect',$output_type='checkbox_terms',$defaultParam=['defaultLabel'=>'---','multiple'=>true];
	public static function fill_param($param,$meta){
		$param=parent::fill_param($param,$meta);
		$param['options']=checkbox_terms::get_selections($meta);
		return $param;
	}
}
?>