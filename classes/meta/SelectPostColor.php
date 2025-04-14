<?php
namespace Catpow\meta;

class SelectPostColor extends UI{
	public static
		$output_type='select';
	static $ui='SelectColor';
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		global $wpdb;
		if($colors=$wpdb->get_col($wpdb->prepare(
			"SELECT meta_value FROM {$wpdb->postmeta} ".
			"WHERE post_id = %d ".
			"AND meta_key = 'post_class' ".
			"AND (meta_value LIKE 'color%' OR meta_value LIKE 'tone%')",
			$id
		),0)){return [implode(' ',$colors)];}
		return ['color0'];
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		global $wpdb;
		$wpdb->query($wpdb->prepare(
			"DELETE FROM {$wpdb->postmeta} ".
			"WHERE post_id = %d ".
			"AND meta_key = 'post_class' ".
			"AND (meta_value LIKE 'color%' OR meta_value LIKE 'tone%')",
			$id
		));
		foreach($vals[0] as $val){
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