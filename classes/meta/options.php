<?php
namespace Catpow\meta;

class options extends meta{
	public static $can_search=false;
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		if(empty($conf['multiple'])){
			return [get_option($conf['option']??$meta_name)];
		}
		return (array)get_option($conf['option']??$meta_name);
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		if(empty($vals)){
			delete_option($conf['option']??$meta_name);
			return;
		}
		update_option($conf['option']??$meta_name,empty($conf['multiple'])?reset($vals):$vals);
	}
	
	public static function output($meta,$prm){
		$conf=$meta->conf;
		if(isset($conf['output_type'])){
			$class=\cp::get_class_name('meta',$conf['output_type']);
			return $class::output($meta,$prm);
		}
		if(isset($conf['meta'])){return data::output($meta,$prm);}
		return parent::output($meta,$prm);
	}
	public static function input($meta,$prm){
		$conf=$meta->conf;
		if(isset($conf['input_type'])){
			$class=\cp::get_class_name('meta',$conf['input_type']);
			return $class::input($meta,$prm);
		}
		if(isset($conf['meta'])){return data::input($meta,$prm);}
		return parent::input($meta,$prm);
	}
	
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){}
}
?>