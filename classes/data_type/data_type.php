<?php
namespace Catpow\data_type;

abstract class data_type{
	public static $data_type,$key_translation=[];
	public static function get_object($data_name,$data_id){
		return false;
	}
	public static function get_id($obj){
		return $obj->{static::$key_translation['id']};
	}
	public static function get_parent($obj){
		return $obj->{static::$key_translation['parent']};
	}
	public static function get_name($obj){
		return $obj->{static::$key_translation['name']};
	}
	public static function get_title($obj){
		return $obj->{static::$key_translation['title']};
	}
	public static function get_content($obj){
		return apply_filters('the_content',$obj->{static::$key_translation['content']});
	}
	public static function get_uri($obj){
		return static::get_name($obj);
	}
	public static function get_url($obj){
		$query_class=\cp::get_class_name('query',substr(strrchr(static::class,'\\'),1));
		return $query_class::get_the_url($obj);
	}
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