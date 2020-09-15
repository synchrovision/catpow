<?php
namespace Catpow\meta;

class DateSelect extends UI{
	public static $output_type='date';
	public static function fill_param($prm,$meta){
		$prm=(array)$prm;
		if(isset($meta->conf['min'])){$prm['min']=date('Y-m-d',strtotime($meta->conf['min']));}
		if(isset($meta->conf['max'])){$prm['max']=date('Y-m-d',strtotime($meta->conf['max']));}
		return parent::fill_param($prm,$meta);
	}
}
?>