<?php
namespace Catpow\setup;

class menu implements iSetup{
	static function exec(){
		global $nav_datas;
		$locations=get_theme_mod('nav_menu_locations');
		$cnt=0;
		$default_menu_items=self::get_default_menu_items();
		foreach($nav_datas as $menu_name=>$menu_data){
			if(!has_nav_menu($menu_name)){
				if($menu_object=wp_get_nav_menu_object($menu_name)){
					$locations[$menu_name]=$menu_object->term_id;
					printf('allocate menu to %s<br/>',$menu_name);
					$cnt++;
				}
				else{
					$locations[$menu_name]=wp_update_nav_menu_object(0,array('menu-name'=>$menu_name,'slug'=>$menu_name));
					printf('create and allocate menu to %s<br/>',$menu_name);
					$menu_item_created[$menu_name]=[];
					if(isset($menu_data['type'])){
						$menu_type=$menu_data['type'];
					}
					else{
						$menu_type=self::get_menu_type_for_location($menu_name);
					}
					foreach((array)$default_menu_items[$menu_type] as $page_path=>$menu_item){
						if(isset($menu_item['parent']) && isset($menu_item_created[$menu_name][$menu_item['parent']])){
							$menu_item['menu-item-parent-id']=$menu_item_created[$menu_name][$menu_item['parent']];
						}
						$menu_item_created[$menu_name][$page_path]=wp_update_nav_menu_item($locations[$menu_name],'',$menu_item);
					}
					$cnt++;
				}
			}
		}
		printf('%d menus updated',$cnt);
		set_theme_mod('nav_menu_locations',$locations);
	}
	static function get_default_menu_items(){
		$default_menu_items=[];
		foreach($GLOBALS['static_pages'] as $data_name=>$conf){
			if($post=get_page_by_path($conf['page_path'])){
				$menu_item=[
					'menu-item-title'=>$conf['label'],
					'menu-item-object-id'=>$post->ID,
					'menu-item-object'=>'page',
					'menu-item-status'=>'publish',
					'menu-item-type'=>'post_type',
					'parent'=>$conf['parent']??null
				];
				if(isset($conf['menu'])){
					foreach((array)$conf['menu'] as $menu_type){
						$default_menu_items[$menu_type][$conf['page_path']]=$menu_item;
					}
				}
				else{
					$default_menu_items['sitemap'][$conf['page_path']]=$menu_item;
					if(isset($conf['parent'])){$page_name=explode('/',$conf['parent'])[0];}
					else{$page_name=$data_name;}
					switch($page_name){
						case 'inqury':
						case 'contact':
						case 'download':
							$default_menu_items['primary'][$conf['page_path']]=$menu_item;
							break;
						case 'faq':
						case 'terms':
						case 'agreement':
						case 'privacy':
							$default_menu_items['sub'][$conf['page_path']]=$menu_item;
							break;
						default:
							$default_menu_items['main'][$conf['page_path']]=$menu_item;
					}

				}

			}
		}
		return $default_menu_items;
	}
	static function get_menu_type_for_location($location){
		switch($location){
			case 'primary':
			case 'sitemap':return $location;
			case 'header':
			case 'side':return 'main';
			default:return 'sub';
		}
	}
}