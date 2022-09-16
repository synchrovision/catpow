<?php
namespace Catpow\meta;

class date extends meta{
	public static
		$input_type='date',
		$value_type='DATE',
		$validation=['text','date'],
		$can_search_with_range=true;
	
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val)){return $meta->conf['default_output']??'---';}
		if(empty($prm)){return \Catpow\calendar::dates_to_str($val);}
		if($prm=='time'){return strtotime($val);}
		return wp_date($prm,strtotime($val));
	}
	public static function resolve_conf($conf){
		if(empty($conf['role'])){$conf['role']='date';}
		return $conf;
	}
}
?>