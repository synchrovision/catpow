<?php
namespace Catpow\meta;

class SelectPostColor extends UI{
	static $ui='SelectColor';
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		global $wpdb;
		if($colors=$wpdb->get_col($wpdb->prepare(
			"SELECT meta_value FROM {$wpdb->postmeta} ".
			"WHERE post_id = %d ".
			"AND meta_key = 'post_class' ".
			"AND (meta_value LIKE 'has-color%' OR meta_value LIKE 'has-tone%')",
			$id
		),0)){return [$colors];}
		return [['has-color0']];
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		global $wpdb;
		$wpdb->query($wpdb->prepare(
			"DELETE FROM {$wpdb->postmeta} ".
			"WHERE post_id = %d ".
			"AND meta_key = 'post_class' ".
			"AND (meta_value LIKE 'has-color%' OR meta_value LIKE 'has-tone%')",
			$id
		));
		foreach($vals[0] as $val){
			add_post_meta($id,'post_class',$val);
		}
	}
	public static function output($meta,$prm){
		$val=implode(' ',(array)$meta->value);
		if($prm=='chip'){return sprintf('<span class="colorChip fillColor %s"></span>',$val);}
		return $val;
	}
	public static function export($data_type,$data_name,$id,$meta_name,$conf){
		return implode(',',static::get($data_type,$data_name,$id,$meta_name,$conf)[0]);
	}
	public static function import($data_type,$data_name,$id,$meta_name,$vals,$conf){
		if(!is_array($vals)){$vals=explode(',',$vals);}
		return static::set($data_type,$data_name,$id,$meta_name,[$vals],$conf);
	}
}
?>