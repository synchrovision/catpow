<?php
namespace Catpow\meta;

class UIDB extends UI{
	public static $is_database=true;
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		return database::get($data_type,$data_name,$id,$meta_name,$conf);
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		database::set($data_type,$data_name,$id,$meta_name,$vals,$conf);
	}
	
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		database::add($data_type,$data_name,$id,$meta_name,$vals,$conf);
	}
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		database::reflect_to_query($query,$data_type,$data_name,$meta_name,$id,$input,$conf);
	}
}
?>