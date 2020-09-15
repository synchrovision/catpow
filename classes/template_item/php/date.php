<?php
namespace Catpow\template_item\php;
/**
* カスタムヘッダーイメージ
*/

class date extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$metas=$conf_data['meta']?:null;
		switch($path_data['data_type']){
			case 'post':
			case 'page':
			case 'menu':
				return "<?= get_the_date(); ?>";
			case 'user':
				return '<?= obj()->user_registered ?>';
			case 'term':
				return '<?= obj()->slug ?>';
			case 'cpdb':
				$real_path_data=\cp::parse_conf_data_path($conf_data['path']);
				switch($real_path_data['data_type']){
					case 'post':
					case 'page':
					case 'menu':
						return "<?= get_the_date(obj()['root_object_id']); ?>";
					case 'user':
						return "<?= get_user(obj()['root_object_id'])->user_registered ?>";
					case 'term':
						return "<?= get_term(obj()['root_object_id'])->slug ?>";
				}
			default:
				if(isset($metas['date'])){return "<?php output('date'); ?>";}
		}
		return $conf_data['label'];
	}
}

?>