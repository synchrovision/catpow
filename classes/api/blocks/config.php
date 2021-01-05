<?php
namespace Catpow\api\blocks;
/**
* ブロックの設定のAPI
* 指定のブロックのconfig.phpファイルを
*/

class config extends \Catpow\api{
	public static function call($req,$res){
		if($f=\cp::get_file_path('blocks/'.$req['tmp_name'].'/api-'.$req['action'].'.php')){
			include $f;
		}
		else{
			$res->set_status(400);
		}
	}
	public static function permission($req){
		return true;
	}
}

?>