<?php
namespace Catpow\template_type;
/**
* 
*/

class app extends template_type{
	public static function get_embeddables($path,$conf_data){
		$config_json=\cp::get_file_path($path.'/config.json',\cp::FROM_THEME|\cp::FROM_CONFIG);
		$config=json_decode(file_get_contents($config_json),true);
		$app_name=$config['AppName']??'App';
		return ['app'=>[$app_name=>'app.js']];
	}
}

?>