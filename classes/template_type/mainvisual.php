<?php
namespace Catpow\template_type;
/**
* ページの最初に配置するメインビジュアルのテンプレート
*/

class mainvisual extends template_type{
	public static $permalinks=[];
	
	public static function get_embeddables($path,$conf_data){
		return [
			'embed'=>[__('メインビジュアル','catpow')=>'index.php']
		];
	}
}

?>