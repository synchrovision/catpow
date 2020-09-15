<?php
namespace Catpow\meta;

class post_parent extends post_title{
	
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		if(empty(array_filter($input['value']))){return false;}
		$query['post_parent']=$input['value'];
	}
}
?>