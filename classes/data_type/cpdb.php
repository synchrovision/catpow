<?php
namespace Catpow\data_type;

class cpdb extends data_type{
	public static
		$data_type='cpdb',
		$default_template=[],
		$key_translation=['id'=>'meta_id'];
	public $table_name,$data;
	
	public static function get_title($obj){
		return $obj->title??$obj->name??reset($obj->data);
	}
	public static function get_content($obj){
		return apply_filters('the_content',$obj->content??$obj->desc??$obj->text??reset($obj->data));
	}
	public static function get_meta($data_name,$data_id,$meta_name,$single=false){
		static $cache;
		global $cpdb;
		if(!isset($cache[$data_name][$data_id])){
			$rows=$cpdb->select($data_name,['meta_id'=>$data_id]);
			$cache[$data_name][$data_id]=reset($rows);
		}
		if($single)return $cache[$data_name][$data_id][$meta_name]??null;
		return (array)($cache[$data_name][$data_id][$meta_name]??null);
	}
	public static function delete_meta($data_name,$data_id,$meta_name,$val=null){
		global $cpdb;
		if(is_null($meta_name)){$cpdb->delete($data_name,['meta_id'=>$data_id]);}
		else{$cpdb->update($data_name,[$data_id=>[$meta_name=>null]]);}
	}
	public static function add_meta($data_name,$data_id,$meta_name,$val,$unique=false){
		global $cpdb;
		$cpdb->update($data_name,[$data_id=>[$meta_name=>$val]]);
	}
	public static function update_meta($data_name,$data_id,$meta_name,$val,$prev_value=false){
		global $cpdb;
		$cpdb->update($data_name,[$data_id=>[$meta_name=>$val]]);
	}
	
	public function __construct($table_name,$data){
		$this->table_name=$table_name;
		$this->data=$data;
	}
	public function __get($name){
		if(isset($this->data[$name])){return $this->data[$name];}
	}
}

?>