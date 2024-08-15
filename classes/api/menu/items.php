<?php
namespace Catpow\api\menu;
use Catpow\MenuManager;
use Catpow\util\cond;
/**
* 投稿やカテゴリをメニューアイテムとして取得
* eg:
* /list/main/ デフォルトのメインメニューのアイテムを取得
* /list/post/[post_type] 投稿タイプのメニューアイテムを取得
* /dict/ 全てのメニューアイテムをタイプ別に取得
* /dict/default　デフォルトのメニューアイテムをロケーション別に取得
*/

class items extends \Catpow\api{
	public static 
		$method=false,
		$check_nonce=false;
	public static function call($req,$res){
		$cat=$req['location']??$req['action']??null;
		$path=$req['path']??($req['param']?"{$cat}/{$req['param']}":null)??null;
		$type=$req['type']??$req['tmp']??(empty($path)?'dict':'list');
		error_log(var_export([$req['tmp']],1).__FILE__.__LINE__);
		if($type==='list'){
			if(strpos($path,'/')===false){
				$res->set_data(MenuManager::get_default_menu_items()[$path]);
			}
			else{
				$query=$req['query']??null;
				if(!empty($query) && is_string($query)){
					$cond=new cond($query);
					$query=$cond->get_query($path);
				}
				$res->set_data(MenuManager::get_menu_items_by_query($path,$query));
			}
		}
		elseif($type==='dict'){
			if(empty($path)){
				$res->set_data(MenuManager::get_all_menu_items());
			}
			else{
				if($path==='default'){
					$res->set_data(MenuManager::get_default_menu_items());
				}
			}
		}
	}
}

?>