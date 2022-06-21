<?php
namespace Catpow\template_type;
/**
* 
*/

class pwa extends template_type{
	public static $permalinks=['file'];
	
	public static function get_nav_menu_items($path,$conf_data){
		$manifest_json=\cp::get_file_path($path.'/manifest.json',\cp::FROM_THEME|\cp::FROM_CONFIG);
		$manifest=json_decode(file_get_contents($manifest_json),true);
		return [
			$manifest['name']=>$conf_data['name'].'/pwa/index.html'
		];
	}
}

?>