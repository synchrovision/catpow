<?php
namespace Catpow\api\config;
use Catpow\util\style_config;
/**
* カスタマイズの設定項目を取得
*/

class customize extends \Catpow\api{
	public static function call($req,$res){
		$data=[];
		foreach(style_config::$control_names as $control_name){
			$data[$control_name]=style_config::{'get_'.$control_name.'_roles'}();
		}
		$res->set_data($data);
	}
	public static function permission($req){
		return true;
	}
}

?>