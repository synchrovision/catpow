<?php
namespace Catpow\data_type;

abstract class data_type{
	public static $data_type;
	public static function get_meta($data_name,$data_id,$meta_name,$single=false){
		return get_metadata(static::$data_type,$data_id,$meta_name,$single);
	}
	public static function delete_meta($data_name,$data_id,$meta_name,$val=null){
		return delete_metadata(static::$data_type,$data_id,$meta_name,$val);
	}
	public static function add_meta($data_name,$data_id,$meta_name,$val,$unique=false){
		return add_metadata(static::$data_type,$data_id,$meta_name,$val,$unique);
	}
	public static function update_meta($data_name,$data_id,$meta_name,$val,$prev_value=false){
		return update_metadata(static::$data_type,$data_id,$meta_name,$val,$prev_value);
	}
	public static function get_default_templates($conf){
		if(empty($conf['meta'])){return ['single'];}
		return ['single','admin'];
	}
}

?>