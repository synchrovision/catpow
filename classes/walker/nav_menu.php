<?php
namespace Catpow\walker;
class nav_menu extends \Walker_Nav_Menu {
	public function walk($menu_items,$max_depth,...$args){
		$path="nav/{$args[0]->theme_location}/nav_menu";
		$childrens=[];
		foreach($menu_items as $menu_item){
			if(!isset($childrens[$menu_item->ID])){$childrens[$menu_item->ID]=[];}
			$childrens[$menu_item->menu_item_parent][]=$menu_item;
		}
		foreach($childrens as $id=>$children){
			$childrens[$id]=new \Catpow\content\loop(['path'=>$path,'objects'=>$children]);
		}
		foreach($childrens as $id=>$children){
			$childrens[$id]->childrens=$childrens;
		}
		\cp::enqueue_script($path.'/script.js');
		\cp::enqueue_style($path.'/style.css');
		$childrens[0]->render('loop.php');
	}
}
