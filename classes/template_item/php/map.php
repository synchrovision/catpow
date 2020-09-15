<?php
namespace Catpow\template_item\php;
/**
* アイコン
*/

class map extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		if(isset($conf_data['meta']['map'])){
			return ['div.map',"<?php output('map'); ?>"];
		}
		return false;
	}
}

?>