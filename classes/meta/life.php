<?php
namespace Catpow\meta;

class life extends date{
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		$lifes=get_option('_cp_post_life');
		return $lifes[$id]?:[];
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		$lifes=get_option('_cp_post_life');
		$lifes[$post_id]=$vals;
		update_option('_cp_post_life',$lifes);
	}
}
?>