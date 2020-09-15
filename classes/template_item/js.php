<?php
namespace Catpow\template_item;
/**
* テンプレートファイルで使用される要素
*/

abstract class js extends template_item{
	public static function render($path_data,$conf_data,$code_data,$indent=0){
		$is_line_start=true;
		foreach($code_data as $key=>$val){
			if($is_line_start)echo(str_repeat("\t",$indent));
			if(is_string($val) and $val[0]=='@'){
				$val=explode(' ',substr($val,1));
				$class_name=\cp::get_class_name('template_item','js',array_shift($val));
				$val=$class_name::get_code_data($path_data,$conf_data,$val);
			}
			if(is_array($val)){
				ob_start();self::render($path_data,$conf_data,$val,$indent+1);
				$val="\n".ob_get_clean().str_repeat("\t",$indent);
			}
			if(is_numeric($key)){$key='%s';}
			printf($key."\n",$val);
			$is_line_start=false;
		}
	}
}

?>