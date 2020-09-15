<?php
namespace Catpow\meta;

class paged extends number{
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		$query['paged']=$input['value'][0];
	}
}
?>