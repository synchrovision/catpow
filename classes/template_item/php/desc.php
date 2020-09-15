<?php
namespace Catpow\template_item\php;
/**
* カスタムヘッダーイメージ
*/

class desc extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		if(isset($conf_data['meta']['desc'])){return "<?php output('desc'); ?>";}
		switch($path_data['data_type']){
			case 'post':
			case 'page':
			case 'nav':
				return '<?php the_excerpt(); ?>';
			case 'term':
				return '<?= obj()->description ?>';
		}
		return false;
	}
}

?>