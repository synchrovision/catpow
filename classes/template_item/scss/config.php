<?php
namespace Catpow\template_item\scss;
/**
* テンプレートファイルで使用される要素
*/

class config extends \Catpow\template_item\scss{
	public static function get_code_data($path_data,$conf_data,$param){
		return '@import "config/style_config.scss";';
	}
}

?>