<?php
namespace Catpow\template_item\php;
/**
* アイコン
*/

class icon extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		if(isset($conf_data['meta']['icon'])){
			return ['span.icon',"<?php output('icon'); ?>"];
		}
		return false;
	}
}

?>