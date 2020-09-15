<?php
namespace Catpow\template_item\php;
/**
* ページヘッダー
*/

class sidebar extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$rtn=['','<?php get_sidebar(); ?>'];
		return $rtn;
	}
}

?>