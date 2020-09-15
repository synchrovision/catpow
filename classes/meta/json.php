<?php
namespace Catpow\meta;

class json extends meta{
	public static
		$can_search=false,
		$has_parent=false;
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		if($f=\cp::get_file_path('json/'.($conf['value']??$meta_name).'.json')){
			return (array)json_decode(file_get_contents($f));
		}
		return [];
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		$f=\cp::get_file_path('json/'.($conf['value']??$meta_name).'.json',\cp::FROM_THEME|\cp::FROM_DEFAULT);
		if(empty($f)){
			$f=get_stylesheet_directory().'/json/'.($conf['value']??$meta_name).'.json';
			if(!is_dir(dirname($f))){mkdir(dirname($f));}
		}
		file_put_contents($f,json_encode(array_values($vals??[]),\JSON_UNESCAPED_UNICODE));
	}
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		$f=\cp::get_file_path('json/'.($conf['value']??$meta_name).'.json',\cp::FROM_THEME|\cp::FROM_DEFAULT);
		if(empty($f)){
			$f=get_stylesheet_directory().'/json/'.($conf['value']??$meta_name).'.json';
			if(!is_dir(dirname($f))){mkdir(dirname($f));}
		}
		$vals=array_merge(static::get($data_type,$data_name,$id,$meta_name,$conf),$vals);
		file_put_contents($f,json_encode(array_values($vals??[]),\JSON_UNESCAPED_UNICODE));
	}
	
	public static function fill_conf(&$conf){
		if(!isset($conf['multiple'])){$conf['multiple']=1;}
	}
}
?>