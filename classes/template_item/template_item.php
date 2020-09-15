<?php
namespace Catpow\template_item;
/**
* テンプレートファイルで使用される要素
*/

abstract class template_item{
	
	abstract public static function get_code_data($path_data,$conf_data,$param);
	
	public static function render($path_data,$conf_data,$code_data,$indent=0){
		foreach($code_data as $key=>$val){
			if(is_array($val)){
				self::render($path_data,$conf_data,$val,$indent+1);
			}
			else{
				echo str_repeat("\t",$indent).$val."\n";
			}
		}
		return true;
	}
}

?>