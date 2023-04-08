<?php
/**
* メニュー関連のメソッド
* 
*/
namespace Catpow\util;
use Catpow\content\loop;
class nav{
	public static function get_menu_props($location){
		$tmp=new loop(['parent'=>false]);
		return self::get_menu_item_props($tmp->query('nav/'.$location.'/default'));
	}
	private static function get_menu_item_props($loop){
		$props=[];
		$conf=$loop->conf;
		foreach($loop->loop() as $menu_item){
			$item=[
				'ID'=>$menu_item->ID,
				'title'=>$menu_item->title,
				'url'=>$menu_item->url,
				'classes'=>array_values(array_filter($menu_item->classes))
			];
			if(!empty($conf['meta'])){
				foreach($conf['meta'] as $name=>$meta_conf){
					$item[$name]=$loop->meta($name)->props;
				}
			}
			$children=$loop->children();
			if(!$children->is_empty()){
				$item['children']=self::get_menu_item_props($children);
			}
			$props[]=$item;
		}
		return $props;
	}
}

?>