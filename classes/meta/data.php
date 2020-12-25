<?php
namespace Catpow\meta;

/**
* @todo 子孫要素のgetやsetを考慮した値の入出力の実装
*
*/

class data extends meta{
	
	public static
		$can_search=false,
		$has_children=true;
	
	public static function output($meta,$prm){
		$format=$meta->conf['output-item-format']??$meta->conf['item-format']??null;
		$inputs=[];
		
		foreach((array)$meta->conf['meta'] as $name=>$child_meta){
			$inputs[$name]=$meta->meta($name)->get_output();
		}
		if(isset($format)){
			return vsprintf($format,$inputs);
		}
		$rtn='<table class="inputs"><tbody>';
		foreach($inputs as $name=>$input){
			$rtn.='<tr><th>'.$meta->conf['meta'][$name]['label'].'</th><td>'.$input.'</td></tr>';
		}
		$rtn.='</tbody></table>';
		return $rtn;
	}
	public static function input($meta,$prm){
		$format=$meta->conf['input-item-format']??$meta->conf['item-format']??null;
		$inputs=[];
		
		foreach((array)$meta->conf['meta'] as $name=>$child_meta){
			$inputs[$name]=$meta->meta($name)->get_input();
		}
		if(isset($format)){
			return vsprintf($format,$inputs);
		}
		$rtn='<table class="inputs"><tbody>';
		foreach($inputs as $name=>$input){
			$rtn.='<tr><th>'.$meta->conf['meta'][$name]['label'].'</th><td>'.$input.'</td></tr>';
		}
		$rtn.='</tbody></table>';
		return $rtn;
	}
	public static function reflect_to_order(&$order_data,$data_type,$data_name,$meta_name,$conf){
		return false;
	}
}
?>