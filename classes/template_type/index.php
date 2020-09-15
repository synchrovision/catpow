<?php
namespace Catpow\template_type;
/**
* 
*/

class index extends template_type{
	public static function get_embeddables($conf_data){
		return ['loop'=>['目次'=>'loop.php']];
	}
}

?>