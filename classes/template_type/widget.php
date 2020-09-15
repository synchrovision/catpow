<?php
namespace Catpow\template_type;
/**
* 
*/

class widget extends template_type{
	public static function get_embeddables($conf_data){
		return ['widget'=>['Widget'=>'loop.php']];
	}
}

?>