<?php
namespace Catpow\template_type;
/**
* 
*/

class listed extends template_type{
	public static $permalinks=[];
	
	public static function get_embeddables($path,$conf_data){
		return [
			'loop'=>[
				'一覧'=>'loop.php'
			]
		];
	}
}

?>