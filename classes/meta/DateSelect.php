<?php
namespace Catpow\meta;

class DateSelect extends UI{
	public static
		$value_type='DATE',
		$output_type='date',
		$can_search_with_range=true,
		$defaultParam=['exclude'=>false];
	
	public static function fill_param($prm,$meta){
		$prm=(array)$prm;
		if(isset($meta->conf['min'])){$prm['min']=date('Y-m-d',strtotime($meta->conf['min']));}
		if(isset($meta->conf['max'])){$prm['max']=date('Y-m-d',strtotime($meta->conf['max']));}
		return parent::fill_param($prm,$meta);
	}
}
?>