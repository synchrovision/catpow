<?php
namespace Catpow\api\blocks\parts;
/**
* パンくずリスト
*/

class breadcrumb{
	public static function preview($req){
		\Catpow\template_part\breadcrumb::render($req->get_params());
	}
	public static function render($atts){
		\Catpow\template_part\breadcrumb::render($atts);
	}
}

?>