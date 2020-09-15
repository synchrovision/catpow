<?php
namespace Catpow\meta;

class user_login extends meta{
	public static
		$input_type='text',
		$validation=['text'];
	
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		$type=static::get_type();
		if($user=get_user($id)){return [$user->$type];}
		return false;
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		if(reset($vals)){wp_update_user(['ID'=>$id,'display_name'=>reset($vals)]);}
	}
	public static function reflect_to_data(&$data,$data_type,$data_name,$meta_name,$id,$input,$conf){
		$data['object_data'][static::get_type()]=$input['value'];
	}
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		if(empty(array_filter($input['value']))){return false;}
		$query['search']=reset($input['value']);
		$query['search_column']=static::get_type();
			
	}
}
?>