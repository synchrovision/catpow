<?php
namespace Catpow\template_type;
/**
* 投稿の編集フォームのテンプレートです
*/

class editblock extends template_type{
	public static function get_embeddables($conf_data){
		return [
			'formblock'=>['編集'=>'form.php']
		];
	}
}

?>