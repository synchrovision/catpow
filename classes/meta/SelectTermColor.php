<?php
namespace Catpow\meta;

class SelectTermColor extends SelectPostColor{
	public static
		$input_type='select';
	static $ui='SelectColor';
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		global $wpdb;
		if($color=$wpdb->get_var($wpdb->prepare(
			"SELECT meta_value FROM {$wpdb->termmeta} ".
			"WHERE term_id = %d ".
			"AND meta_key = 'term_class' ".
			"AND meta_value LIKE 'color%'",
			$id
		))){return [$color];}
		return ['color0'];
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		global $wpdb;
		$wpdb->query($wpdb->prepare(
			"DELETE FROM {$wpdb->termmeta} ".
			"WHERE term_id = %d ".
			"AND meta_key = 'term_class' ".
			"AND meta_value LIKE 'color%'",
			$id
		));
		foreach($vals as $val){
			add_term_meta($id,'term_class',$val);
		}
	}
}
?>