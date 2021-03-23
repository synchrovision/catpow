<?php
namespace Catpow\meta;

class select_json extends meta{
	public static
		$input_type='select';
	
	public static function output($meta,$prm){
		$sels=self::get_selections($meta);
		$v=$meta->value;
		foreach($sels as $key=>$val){
			if(is_array($val)){
				foreach($val as $k=>$s){
					if($s==$v){return is_int($k)?$s:$k;}
				}
			}
			elseif($val==$v){return is_int($key)?$val:$key;}
		}
	}
	public static function input($meta,$prm){
		$sels=self::get_selections($meta);
		return select::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
	
	public static function get_selections($meta){
		$f=\cp::get_file_path('json/'.($meta->conf['value']??$meta->conf['name']).'.json');
		if(empty($f)){return [];}
		$rtn=json_decode(file_get_contents($f),true);
		if(isset($meta->conf['addition'])){
			if(is_array($meta->conf['addition'])){$rtn=array_merge($rtn,$meta->conf['addition']);}
			else{$rtn[$meta->conf['addition']]=0;}
		}
		return $rtn;
	}
}
?>