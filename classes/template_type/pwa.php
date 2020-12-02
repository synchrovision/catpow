<?php
namespace Catpow\template_type;
/**
* 
*/

class pwa extends template_type{
	public static $permalinks=['file'];
	
	public static function get_nav_menu_items($conf_data){
		return [
			$conf_data['label'].' PWA'=>$conf_data['name'].'/pwa/index.html'
		];
	}
}

?>