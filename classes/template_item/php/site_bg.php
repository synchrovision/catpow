<?php
namespace Catpow\template_item\php;
/**
* カスタムヘッダーイメージ
*/

class site_bg extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		if($prm=get_theme_support('custom-background')){
			return '<div class="site_bg" style="<?php site_bg_style(); ?>"></div>';
		}
		return false;
	}
}

?>