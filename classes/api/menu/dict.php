<?php
namespace Catpow\api\menu;
use Catpow\MenuManager;
use Catpow\util\cond;
/**
* すべての投稿・カテゴリーをメニューアイテムとして取得
*/

class dict extends \Catpow\api{
	public static 
		$method=false,
		$check_nonce=false;
	public static function call($req,$res){
		if(empty($req['path'])){
			$res->set_data(MenuManager::get_default_menu_items()['main']);
		}
		else{
			$query=$req['query']??null;
			if(!empty($query) && is_string($query)){
				$cond=new cond($query);
				$query=$cond->get_query($req['path']);
			}
			$res->set_data(MenuManager::get_menu_items_by_query($req['path'],$query));
		}
	}
}

?>