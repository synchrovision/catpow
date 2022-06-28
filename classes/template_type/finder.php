<?php
namespace Catpow\template_type;
/**
* 
*/

class finder extends template_type{
	public static $permalinks=['finder'];
	
	public static function get_nav_menu_items($path,$conf_data){
		return [
			$conf_data['label'].'  Finder'=>$conf_data['name'].'/finder'
		];
	}
}

?>