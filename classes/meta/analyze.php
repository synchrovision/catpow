<?php
namespace Catpow\meta;
/**
* 解析情報を取得する、取得・出力のみで入力はできない
*/
class analyze extends meta{
	public static 
		$can_edit=false;
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		return $conf['callback']($id);
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		return false;
	}
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		return false;
	}
	public static function output($meta,$prm){
		if($meta->conf['output_type']){
			return call_user_func(["\\Catpow\\meta\\{$meta->conf['output_type']}",'output'],$meta,$prm);
		}
		return $meta->value;
	}
	public static function input($meta,$prm){
		return false;
	}
	
	public static function reflect_to_inputs($inputs,$input_id,$vals,$meta){}
	public static function reflect_to_data(&$data,$data_type,$data_name,$meta_name,$id,$input,$conf){}
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){}
	public static function reflect_to_order(&$order_data,$data_type,$data_name,$meta_name,$conf){}
	
}