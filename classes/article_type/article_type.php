<?php
namespace Catpow\article_type;
/**
* 記事タイプ
*/

abstract class article_type{
	public $data_path,$path_data,$conf,$data;
	public static $allowed_block_types=true;
	public function __construct($data_path,$conf,$data){}
	public static function get_menus($conf_data){return [];}
	public static function fill_conf_data(&$conf_data){}
	public static function get_default_post_datas($conf_data){return [];}
	public static function get_allowed_block_types(){
		$allowed_block_types=static::$allowed_block_types;
		$class_name=static::class;
		do{
			$allowed_block_types=apply_filters(
				'allowed_block_types_for_'.substr($class_name,strrpos($class_name,'\\')+1),
				$allowed_block_types
			);
		}
		while(($class_name=get_parent_class($class_name))!==self::class);
		return $allowed_block_types;
	}
	public function mod($key,$val){
		eval('$this->data["'.str_replace('/','"]["',$key).'"]=$val;');
		return $this;
	}
	public function save(){}
	public function load(){}
}

?>