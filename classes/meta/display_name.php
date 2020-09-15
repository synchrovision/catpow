<?php
namespace Catpow\meta;

class display_name extends user_login{
	
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		\Catpow\meta_type::reflect_to_query($query,$data_type,$data_name,'display_name',$id,$input,$conf);
	}
}
?>