<?php
namespace Catpow\validation;

class unique extends validation{
	public static function is_valid(&$val,$conf,$input_id){
		global $wpdb;
		$path_data=\cp::parse_input_id($input_id);
		$data_type=$path_data['data_type'];
		$dbname=$data_type.'meta';
		$idname=$data_type.'_id';
		$data_id=$path_data['data_id'];
		$meta_name=reset($path_data['meta_path'])['meta_name'];
		return empty($wpdb->get_results("SELECT * FROM {$wpdb->$dbname} WHERE meta_key = '{$meta_name}' AND meta_value = '{$val}' AND {$idname} != '{$data_id}'"));
	}
	public static function get_message_format($conf){
		return __('この値はすでに使われています','catpow');
	}
}

?>