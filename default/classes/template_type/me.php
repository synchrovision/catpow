<?php
namespace Catpow\template_type;
/**
* 
*/

class me extends template_type{
	public static $permalinks=['mypage'];
	public static function get_template_files($conf_data){
		return [
			'index.php'=>['','@catpow','@page_content'],
			'header.php'=>['','@catpow','@page_header'],
			'footer.php'=>['','@catpow','@page_footer'],
			'panel.php'=>['','@catpow','@user_panel']
		];
	}
}

?>