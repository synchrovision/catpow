<?php
namespace Catpow\template_item\php;
/**
* サイト共通フッタのコードを出力
*/

class site_footer extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		return '<?php cp::site_footer(); ?>';
	}
}

?>