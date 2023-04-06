<?php
namespace Catpow\template_type;
/**
* 主に個別ページで利用するためのテンプレート
*/

class detail extends template_type{
	public static $permalinks=[];
	
	public static function get_embeddables($path,$conf_data){
		return [
			'loop'=>[
				'詳細'=>'loop.php'
			]
		];
	}
}

?>