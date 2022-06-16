<?php
namespace Catpow\template_type;
/**
* テンプレートの情報
* テンプレート生成・パーマリンク生成時に使用される
*/

class search extends template_type{
	public static $permalinks=['archive'];
	public static function get_embeddables($path,$conf_data){
		return ['form'=>['検索フォーム'=>'form.php']];
	}
	public static function get_nav_menu_items($conf_data){
		return [
			$conf_data['label'].'  検索'=>$conf_data['data_name'].'/search'
		];
	}
}

?>