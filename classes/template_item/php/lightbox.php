<?php
namespace Catpow\template_item\php;
/**
* ボタン
* 
*/

class lightbox extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		return ['div.cp-lightbox__container',['div.cp-lightbox__content']];
	}
}

?>