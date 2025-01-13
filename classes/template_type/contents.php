<?php
namespace Catpow\template_type;
/**
* 埋め込みコンテンツのテンプレート
*/

class contents extends template_type{
	public static $permalinks=[];
	
	public static function get_embeddables($path,$conf_data){
		return [
			'embed'=>[
				__('コンテンツ','catpow')=>'index.php'
			]
		];
	}
}

?>