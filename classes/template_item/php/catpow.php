<?php
namespace Catpow\template_item\php;
/**
* テンプレートファイルで使用される要素
*/

class catpow extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		return '<?php namespace Catpow; ?>';
	}
}

?>