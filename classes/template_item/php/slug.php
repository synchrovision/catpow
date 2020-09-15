<?php
namespace Catpow\template_item\php;
/**
* カスタムヘッダーイメージ
*/

class slug extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$metas=$conf_data['meta']?:null;
		switch($path_data['data_type']){
			case 'post':
			case 'page':
			case 'menu':
				return "<?= get_post_field('post_name'); ?>";
			case 'user':
				return '<?= obj()->name ?>';
			case 'term':
				return '<?= obj()->slug ?>';
			case 'cpdb':
				$real_path_data=\cp::parse_conf_data_path($conf_data['path']);
				switch($real_path_data['data_type']){
					case 'post':
					case 'page':
					case 'menu':
						return "<?= get_post(obj()['root_object_id'])->post_name; ?>";
					case 'user':
						return "<?= get_user(obj()['root_object_id'])->name ?>";
					case 'term':
						return "<?= get_term(obj()['root_object_id'])->slug ?>";
				}
			default:
				if(isset($metas['name'])){return "<?php output('name'); ?>";}
				if(isset($metas['label'])){return "<?php output('label'); ?>";}
				if(isset($metas['title'])){return "<?php output('title'); ?>";}
		}
		return $conf_data['label'];
	}
}

?>