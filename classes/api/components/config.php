<?php
namespace Catpow\api\component;
/**
* 各コンポーネントに実装された api-[action].php ファイルを実行
*/

class config extends \Catpow\api{
	public static 
		$method=false,
		$check_nonce=true;
	public static function call($req,$res){
		if($f=\cp::get_file_path('components/'.$req['tmp_name'].'/api-'.$req['action'].'.php')){
			include $f;
		}
		else{
			$res->set_status(400);
		}
	}
}

?>