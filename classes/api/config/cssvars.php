<?php
namespace Catpow\api\config;
use Catpow\util\style_config;
/**
* カスタマイズの設定項目を取得
*/

class cssvars extends \Catpow\api{
	public static function call($req,$res){
		$res->set_data(style_config::get_css_vars());
	}
	public static function permission($req){
		return true;
	}
}

?>