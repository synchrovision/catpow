<?php
namespace Catpow\query;

class nav extends post{
	public static
		$data_name='nav_menu_item',
		$data_type_name='theme_location',
		$data_id_name='db_id',
		$query_class=false;
	protected static
		$menu_items=[],
		$menu_items_by_id=[];
	
	public function __construct($q){
		$this->q=static::fill_query_vars($q);
		$this->query($this->q);
	}
	public static function fill_query_vars($q){
		$q['post_type']='nav_menu_item';
		if(isset($q['data_name'])){
			$q['theme_location']=$q['data_name'];
		}
		if(isset($q['data_id'])){$q['ID']=$q['data_id'];}
		if(isset($q['p'])){$q['ID']=$q['p'];}
		return $q;
	}
	
	public function query($q){
		$location=$q['theme_location'];
		if(!isset(static::$menu_items[$location])){
			$menu=wp_get_nav_menu_object(get_nav_menu_locations()[$location]);
			$menu_items=wp_get_nav_menu_items($menu->term_id,['update_post_term_cache'=>false]);
			_wp_menu_item_classes_by_context($menu_items);
			$menu_items_by_id=array_column($menu_items,null,'ID');
			$menu_items_by_parent_id=[];
			foreach($menu_items as $menu_item){
				$menu_items_by_parent_id[$menu_item->menu_item_parent][]=$menu_item;
			}
			foreach(array_keys($menu_items_by_parent_id) as $parent_id){
				if(empty($parent_id)){continue;}
				$menu_items_by_id[$parent_id]->classes[]='menu-item-has-children';
			}
			static::$menu_items_by_id[$location]=$menu_items_by_id;
			static::$menu_items[$location]=$menu_items_by_parent_id;
		}
		if(isset($q['ID'])){
			$this->objects=[static::$menu_items_by_id[$location][$q['ID']]];
		}
		else{
			$this->objects=static::$menu_items[$location][$q['parent']??0]??[];
		}
	}
	public function is_empty(){
		return empty($this->objects);
	}
	public function count(){
		return count($this->objects);
	}
	public static function realize_path_data($path_data){
		$path_data['data_type']='post';
		$path_data['data_name']='nav_menu_item';
		return $path_data;
	}
}

?>