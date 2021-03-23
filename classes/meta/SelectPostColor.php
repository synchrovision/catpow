<?php
namespace Catpow\meta;

class SelectPostColor extends UI{
	public static
		$input_type='select';
	static $ui='SelectColor';
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		global $wpdb;
		if($color=$wpdb->get_var($wpdb->prepare(
			"SELECT meta_value FROM {$wpdb->postmeta} ".
			"WHERE post_id = %d ".
			"AND meta_key = 'post_class' ".
			"AND meta_value LIKE 'color%'",
			$id
		))){return [$color];}
		return ['color0'];
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		global $wpdb;
		$wpdb->query($wpdb->prepare(
			"DELETE FROM {$wpdb->postmeta} ".
			"WHERE post_id = %d ".
			"AND meta_key = 'post_class' ".
			"AND meta_value LIKE 'color%'",
			$id
		));
		foreach($vals as $val){
			add_post_meta($id,'post_class',$val);
		}
	}
	public static function output($meta,$prm){
		$val=$meta->value;
		if($prm=='chip'){return sprintf('<span class="colorChip fillColor %s"></span>',$val);}
		return $val;
	}
}
?>