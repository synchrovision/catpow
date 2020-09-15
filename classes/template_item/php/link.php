<?php
namespace Catpow\template_item\php;
/**
* 現在のコンテンツのリンク* 
*/

class link extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		return ['div.link',['a[href="<?= url(); ?>"]']];
	}
}

?>