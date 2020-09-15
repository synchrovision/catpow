<?php
namespace Catpow\meta;

class media_sp extends media{
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		$data=wp_get_attachment_metadata($id);
		return [(isset($data['alt_image']['medium_large']))?$data['alt_image']['medium_large']:$id];
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		$data=wp_get_attachment_metadata($id);
		$data['alt_image']['medium_large']=reset($vals);
		wp_update_attachment_metadata($id,$data);
	}
}
?>