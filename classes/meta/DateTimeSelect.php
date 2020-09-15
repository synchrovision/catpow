<?php
namespace Catpow\meta;

class DateTimeSelect extends UI{
	public static
		$data_type='datetime',
		$defaultParam=['step'=>15];
	
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($prm)){$prm='Y年m月d日 H:i';}
		if($prm=='time'){return strtotime($val);}
		return date($prm,strtotime($val));
	}
	public static function fill_param($prm,$meta){
		$prm=(array)$prm;
		if(isset($meta->conf['min'])){$prm['min']=date('Y-m-d H:i:s',strtotime($meta->conf['min']));}
		if(isset($meta->conf['max'])){$prm['max']=date('Y-m-d H:i:s',strtotime($meta->conf['max']));}
		return parent::fill_param($prm,$meta);
	}
}
?>