<?php
namespace Catpow\meta;
/**
* 同投稿のmetaの値から動的に入力を生成する
* 
*/
class checksheet extends database{
	static
		$is_bulk_input=true,
		$is_bulk_output=true,
		$is_unit_input=true,
		$is_unit_output=true;
	
	public static function get_sheet_id($conf){
		$sheet=$conf['sheet']??'user';
		if(is_callable($sheet)){return $sheet();}
		switch($sheet){
			case 'user':return \cp::get_uid();
			case 'form':return \cp::$content->form->form_id??null;
			default:return $sheet;
		}
	}
	public static function get_checksheet_conf($data_type,$data_name,$id){
		$conf_data=\cp::get_conf_data($data_type.'/'.$data_name);
	}
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		global $cpdb;
		$rows=$cpdb->select([$data_type,$data_name,$meta_name],['parent_id'=>$id,'sheet_id'=>get_sheet_id($conf)]);
		return array_column($rows,'value');
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		global $cpdb;
		$cpdb->delete([$data_type,$data_name,$meta_name],['parent_id'=>$id,'sheet_id'=>get_sheet_id($conf)]);
		self::add($data_type,$data_name,$id,$meta_name,$vals,$conf);
	}
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		global $cpdb;
		$conf=static::get_checksheet_conf($data_type,$data_name,$id);
		$cpdb->insert([$data_type,$data_name,$meta_name],[
			'root_object_id'=>$id,
			'parent_id'=>$id,
			'sheet_id'=>get_sheet_id($conf),
			'value'=>$vals
		],true);
	}
	public static function output($meta,$prm){
		$conf=static::get_checksheet_conf($meta->data_type,$meta->data_name,$meta->data_id);
		$meta_class=\cp::get_class_name('meta',$conf['checksheet_type']);
		$meta_class::output($meta->mod($conf),$prm);
	}
	public static function input($meta,$prm){
		$conf=static::get_checksheet_conf($meta->data_type,$meta->data_name,$meta->data_id);
		$meta_class=\cp::get_class_name('meta',$conf['checksheet_type']);
		$meta_class::input($meta->mod($conf),$prm);
	}
	
	public static function get_validations($conf){
		$meta_class=\cp::get_class_name('meta',$conf['checksheet_type']);
		return $meta_class::get_validations($conf);
	}
	
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){}
	
	public static function fill_conf(&$conf){
		$conf['meta']=array_merge([
			'sheet_id'=>['type'=>'text'],
			'value'=>['type'=>'data']
		],(array)$conf['meta']);
	}
}
?>