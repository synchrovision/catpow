<?php
namespace Catpow\template_item\php;
/**
* ボタン
* 
*/

class button extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$btns=['ul.buttons.'.array_shift($param)];
		foreach($param as $prm){
			$prm=explode(':',$prm);
			$btn_class=array_shift($prm);
			$label=array_shift($prm);
			if(empty($prm)){$prm='';}
			else{$prm=",'".implode("','",$prm)."'";}
			$btns[]=['li.item.'.$btn_class,sprintf("<?php button(_('%s')%s);?>",$label,$prm)];
		}
		return $btns;
	}
}

?>