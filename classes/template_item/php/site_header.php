<?php
namespace Catpow\template_item\php;
/**
* サイト共通ヘッダのコードを出力
*/

class site_header extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		return '<?php cp::site_header(); ?>';
	}
}

?>