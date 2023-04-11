<?php
namespace Catpow\meta;

class SelectRelPosts extends UI{
	static $ui='SearchSelect',$is_bulk_input=true,$output_type='checkbox_rel_posts',$defaultParam=['defaultLabel'=>'---','multiple'=>true];
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		return checkbox_rel_posts::get($data_type,$data_name,$id,$meta_name,$conf);
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		return checkbox_rel_posts::set($data_type,$data_name,$id,$meta_name,$vals,$conf);
	}
	public static function fill_param($param,$meta){
		$param=parent::fill_param($param,$meta);
		$param['options']=checkbox_rel_posts::get_selections($meta);
		return $param;
	}
}
?>