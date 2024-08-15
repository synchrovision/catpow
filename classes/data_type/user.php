<?php
namespace Catpow\data_type;

class user extends data_type{
	public static $data_type='user',$key_translation=['id'=>'ID','name'=>'user_nicename','title'=>'display_name','content'=>'description'];
	public static function get_object($data_name,$data_id){
		return get_user_by('ID',$data_id);
	}
	public static function get_parent($obj){return 0;}
	public static function get_default_templates($conf){
		if(empty($conf['meta'])){return ['me'];}
		return ['me','admin'];
	}
}

?>