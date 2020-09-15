<?php
namespace Catpow\meta;

class expire extends date{
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		$expires=get_option('_cp_post_expire');
		return (array)$expires[$id]?:[];
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		$expires=get_option('_cp_post_expire');
		$expires[$post_id]=reset($vals);
		update_option('_cp_post_expire',$expires);
	}
}
?>