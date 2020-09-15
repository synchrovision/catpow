<?php
namespace Catpow\data_type;

class catpow extends data_type{
	public static
		$data_type='catpow';
	
	
	public static function get_meta($data_name,$data_id,$meta_name,$single=false){
		static $cache;
		if(!isset($cache[$data_name])){
			if($f=\cp::get_file_path('config/catpow/'.$data_name.'.php',\cp::FROM_THEME)){
				include $f;
				$cache[$data_name]=$value;
			}
			else{return null;}
		}
		if(!isset($cache[$data_name][$meta_name])){return null;}
		if($single)return reset($cache[$data_name][$meta_name]);
		return $cache[$data_name][$meta_name];
	}
	public static function delete_meta($data_name,$data_id,$meta_name,$val=null){
		if($f=\cp::get_file_path('config/catpow/'.$data_name.'.php',\cp::FROM_THEME)){
			include $f;
			if(isset($val)){$value[$meta_name]=array_diff($value[$meta_name],(array)$val);}
			else{$value[$meta_name]=null;}
			file_put_contents($f,'<?php $value='.var_export($value,1).';');
		}
	}
	public static function add_meta($data_name,$data_id,$meta_name,$val,$unique=false){
		if($f=\cp::get_file_path('config/catpow/'.$data_name.'.php',\cp::FROM_THEME)){include $f;}
		else{$f=get_stylesheet_directory().'/config/catpow/'.$data_name.'.php';}
		if(empty($value[$meta_name])){$value[$meta_name]=[$val];}
		else{
			if(($unique && in_array($val,$value[$meta_name]))){return false;}
			$value[$meta_name][]=$val;
		}
		file_put_contents($f,'<?php $value='.var_export($value,1).';');
	}
	public static function update_meta($data_name,$data_id,$meta_name,$val,$prev_value=null){
		if($f=\cp::get_file_path('config/catpow/'.$data_name.'.php',\cp::FROM_THEME)){include $f;}
		else{$f=get_stylesheet_directory().'/config/catpow/'.$data_name.'.php';}
		if(empty($value[$meta_name])){$value[$meta_name]=[$val];}
		else{
			if(isset($prev_value)){
				$value[$meta_name]=array_diff($value[$meta_name],(array)$prev_value);
				$value[$meta_name][]=$val;
			}
			else{$value[$meta_name]=[$val];}
		}
		file_put_contents($f,'<?php $value='.var_export($value,1).';');
	}
	
	public function __constuct($data_name,$data_id){
		
	}
}

?>