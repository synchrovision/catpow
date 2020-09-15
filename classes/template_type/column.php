<?php
namespace Catpow\template_type;
/**
* 
*/

class column extends template_type{
	public static function get_embeddables($conf_data){
		return ['loop'=>['コラム'=>'loop.php']];
	}
}

?>