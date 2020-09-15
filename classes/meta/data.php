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
		$val=$meta->value;
		$rtn='<table class="inputs"><tbody>';
		foreach((array)$meta->conf['meta'] as $n=>$child_meta){
			$rtn.='<tr><th>'.$child_meta['label'].'</th><td>';
			$rtn.=$meta->meta($n)->get_output();
			$rtn.='</td></tr>';
		}
		$rtn.='</tbody></table>';
		return $rtn;
	}
	public static function input($meta,$prm){
		$path=$meta->the_data_path;
		$val=(array)$meta->value;
		$rtn='<table class="inputs"><tbody>';
		foreach((array)$meta->conf['meta'] as $n=>$child_meta){
			$rtn.='<tr><th>'.$child_meta['label'].'</th><td>';
			$rtn.=$meta->meta($n)->get_input();
			$rtn.='</td></tr>';
		}
		$rtn.='</tbody></table>';
		return $rtn;
	}
	public static function reflect_to_order(&$order_data,$data_type,$data_name,$meta_name,$conf){
		return false;
	}
}
?>