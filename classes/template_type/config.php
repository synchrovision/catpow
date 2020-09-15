<?php
namespace Catpow\template_type;
/**
* テンプレートの情報
* テンプレート生成・パーマリンク生成時に使用される
*/

class config extends template_type{
	public static function get_menus($conf_data){
		return [
			'top'=>[
				$conf_data['label']=>'admin.php'
			]
		];
	}
}

?>