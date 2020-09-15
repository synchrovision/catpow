<?php
namespace Catpow\template_item\php;
/**
* カスタムヘッダーイメージ
*/

class page_slug extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		switch($path_data['data_type']){
			case 'page':
				return "<?= get_post_field('post_name'); ?>";
			case 'post':
				if($path_data['data_name']==='page')return "<?= get_post_field('post_name'); ?>";
			default:
				return $conf_data['data_name'];
		}
	}
}

?>