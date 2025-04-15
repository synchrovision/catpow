<?php
namespace Catpow\meta;

class post_thumbnail extends media{
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		if($data_type!=='post'){return false;}
		return get_post_meta($id,'_thumbnail_id');
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		if($data_type!=='post'){return false;}
		delete_post_meta($id,'_thumbnail_id');
		foreach($vals as $val){
			add_post_meta($id,'_thumbnail_id',$val);
		}
	}
}
?>