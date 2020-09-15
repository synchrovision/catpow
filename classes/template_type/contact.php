<?php
namespace Catpow\template_type;
/**
* 
*/

class contact extends template_type{
	public static function get_embeddables($conf_data){
		return [
			'loop'=>[
				__('連絡先','catpow')=>'loop.php'
			]
		];
	}
}

?>