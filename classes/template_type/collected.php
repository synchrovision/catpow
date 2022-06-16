<?php
namespace Catpow\template_type;
/**
* 
*/

class collected extends template_type{
	public static $permalinks=[];
	
	public static function get_embeddables($path,$conf_data){
		return [
			'loop'=>[
				'グループ一覧'=>'loop.php'
			]
		];
	}
}

?>