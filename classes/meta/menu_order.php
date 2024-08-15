<?php
namespace Catpow\meta;

class menu_order extends meta{
	public static $input_type='number';
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		global $wpdb;
		$rtn= $wpdb->get_col($wpdb->prepare(
			"SELECT menu_order FROM $wpdb->posts WHERE ID = %d",$id
		));
		return $rtn;
	}
	
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		global $wpdb;
		$vals=$vals??[0];
		$wpdb->query($wpdb->prepare(
			"UPDATE $wpdb->posts SET menu_order = %d WHERE ID = %d",
			(int)reset($vals),$id
		));
	}
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		if(empty(array_filter($input['value']))){return false;}
		$query['menu_order']=reset($input['value']);
	}
	public static function reflect_to_order(&$order_data,$data_type,$data_name,$meta_name,$conf){
		$order_data['orderby']='menu_order';
		$order_data['desc_first']=false;
		return true;
	}
}
?>