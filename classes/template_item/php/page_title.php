<?php
namespace Catpow\template_item\php;
/**
* カスタムヘッダーイメージ
*/

class page_title extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		switch($path_data['data_type']){
			case 'page':
				return '<?php the_title(); ?>';
			case 'post':
				if($path_data['data_name']==='page')return '<?php the_title(); ?>';
			default:
				return $conf_data['label'];
		}
	}
}

?>