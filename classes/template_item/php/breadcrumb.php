<?php
namespace Catpow\template_item\php;
/**
* パンくずリスト
*/

class breadcrumb extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		return '<?php breadcrumb(); ?>';
	}
}

?>