<?php
namespace Catpow\meta;

class post_title extends meta{
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		$type=static::get_type();
		if(!empty($id) && $post=get_post($id)){return [$post->$type];}
		return false;
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		if(reset($vals)){wp_update_post(['ID'=>$id,static::get_type()=>reset($vals)]);}
	}
	
	public static function reflect_to_data(&$data,$data_type,$data_name,$meta_name,$id,$input,$conf){
		if(empty($input['value'])){return false;}
		$data['object_data'][static::get_type()]=reset($input['value']);
	}
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		if(empty($input['value']) || empty(array_filter($input['value']))){return false;}
		$query['s']=reset($input['value']);
	}
	public static function reflect_to_order(&$order_data,$data_type,$data_name,$meta_name,$conf){
		$order_data['orderby']='post_title';
		$order_data['desc_first']=false;
	}
}
?>