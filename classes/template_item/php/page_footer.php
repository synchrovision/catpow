<?php
namespace Catpow\template_item\php;
/**
* ページヘッダー
*/

class page_footer extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$rtn[]='@menu page_footer';
		return $rtn;
	}
}

?>