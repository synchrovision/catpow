<?php
namespace Catpow\meta;

class PanelSelect extends UI{
	static $ui='PanelSelect',$output_type='select',$defaultParam=['limit'=>false];
	public static function fill_param($prm,$meta){
		$prm=parent::fill_param($prm,$meta);
		if(isset($meta->conf['items'])){
			$prm['items']=static::get_items($meta);
		}
		else{
			$prm['items']=static::get_items_from_selections($meta);
		}
		return $prm;
	}
	public static function get_items($meta){
		return is_callable($meta->conf['items'])?$meta->conf['items']($meta):$meta->conf['items'];
	}
	public static function get_items_from_selections($meta){
		$selections=('Catpow\\meta\\'.static::$output_type)::get_selections($meta);
		return array_map($selections,function($label,$value){
			return [
				'label'=>$label,
				'value'=>$value
			];
		});
	}
}
?>