<?php
namespace Catpow\template_type;
/**
* 柔軟なWP APIとwp_componentの連携テンプレート
*/

class compose extends template_type{
	public static function get_embeddables($conf_data){
		return [
			'snippet'=>[
				'compose'=>'render.php',
			]
		];
	}
	public static function get_rest_routes($conf_data){
		return ['response'=>'response.php'];
	}
}

?>