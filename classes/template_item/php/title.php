<?php
namespace Catpow\template_item\php;
/**
* カスタムヘッダーイメージ
*/

class title extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$metas=$conf_data['meta']??null;
		switch($path_data['data_type']){
			case 'post':
			case 'page':
			case 'menu':
				return '<?php the_title(); ?>';
			case 'user':
				return '<?= obj()->display_name ?>';
			case 'term':
				return '<?= obj()->name ?>';
			case 'cpdb':
				$real_path_data=\cp::parse_conf_data_path($conf_data['path']);
				switch($real_path_data['data_type']){
					case 'post':
					case 'page':
					case 'menu':
						return "<?= get_the_title(obj()['root_object_id']); ?>";
					case 'user':
						return "<?= get_user(obj()['root_object_id'])->display_name ?>";
					case 'term':
						return "<?= get_term(obj()['root_object_id'])->name ?>";
				}
			default:
				if(isset($metas['title'])){return "<?php output('title'); ?>";}
				if(isset($metas['label'])){return "<?php output('label'); ?>";}
				if(isset($metas['name'])){return "<?php output('name'); ?>";}
		}
		return $conf_data['label'];
	}
}

?>