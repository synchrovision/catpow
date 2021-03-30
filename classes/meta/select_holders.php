<?php
namespace Catpow\meta;

class select_holders extends select{
	public static
		$value_type='NUMERIC',
		$data_type='bigint(20)';
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		$holder=$conf['holder'];
		return \cp::get_holders_id($holder[0],$holder[1],$holder[2],$id);
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		$holder=$conf['holder'];
		return \cp::update_holders($holder[0],$holder[1],$holder[2],$vals,$id);
	}
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		$holder=$conf['holder'];
		return \cp::add_holders($holder[0],$holder[1],$holder[2],$vals,$id);
	}
	
	public static function fill_conf(&$conf){
		if(is_string($conf['holder'])){
			$conf['holder']=explode('/',$conf['holder']);
		}
		if(!isset($conf['value'])){
			$conf['value']=[\cp::get_data_type_name($conf['holder'][0])=>$conf['holder'][1]];
		}
	}
	
	public static function get_selections($meta){
		$holder=$meta->conf['holder'];
		$data_type=$holder[0];
		$class_name=\cp::get_class_name('meta','select_rel_'.$data_type.'s');
		$rtn=$class_name::get_selections($meta);
		if(isset($meta->conf['addition'])){
			if(is_array($meta->conf['addition'])){$rtn=array_merge($rtn,$meta->conf['addition']);}
			else{$rtn[$meta->conf['addition']]=0;}
		}
		return $rtn;
	}
}
?>