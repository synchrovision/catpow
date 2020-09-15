<?php
namespace Catpow\meta;

class limit extends number{
	static $input_type='number';
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		$query['limit']=$input['value'][0];
	}
	public static function fill_conf(&$conf){
		$conf['min']=$conf['min']??1;
		$conf['max']=$conf['max']??999;
	}
}
?>