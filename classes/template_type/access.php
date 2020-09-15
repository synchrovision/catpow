<?php
namespace Catpow\template_type;
/**
* 
*/

class access extends template_type{
	public static function get_embeddables($conf_data){
		return [
			'loop'=>[
				__('アクセス','catpow')=>'loop.php'
			]
		];
	}
}

?>