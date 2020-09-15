<?php
add_theme_support('menus');
/*カスタムメニュー*/
add_action('init',function(){
	global $nav_datas;
	foreach($nav_datas as $menu_name=>$menu_data){
		register_nav_menu($menu_name,isset($menu_data['label'])?$menu_data['label']:$menu_name);
	}
});
add_filter('wp_nav_menu_objects',function($items){
	foreach($items as $i=>$item){
		if($item->object=='page'){
			$item->classes[]='menu-item-'.get_post($item->object_id)->post_name;
		}
		if($item->current or $item->current_item_parent){
			$item->classes[]='active';
		}
	}
	return $items;
},10,2);
add_filter('nav_menu_item_title',function($title,$item,$args,$depth){
	global $nav_datas;
	if(isset($nav_datas[$args->theme_location]['template']) && in_array('menu',$nav_datas[$args->theme_location]['template'])){
		ob_start();
		catpow\loop('nav/'.$args->theme_location.'/menu/loop.php',['p'=>$item->ID],compact('title','item','args','depth'));
		return ob_get_clean();
	}
	return $title;
},10,4);


function get_menu_location($menu_item_id,$single=false){
	global $wpdb;
	static $menu_location;
	if(empty($menu_location)){
		$menu_location=array();
		foreach(get_theme_mod('nav_menu_locations') as $location_name=>$menu_id){
			if(is_wp_error($menu_id))continue;
			if(empty($menu_location[$menu_id])){
				$menu_location[$menu_id]=array($location_name);
			}
			else{
				$menu_location[$menu_id][]=$location_name;
			}
		}
	}
	$term=get_the_terms($menu_item_id,'nav_menu');
	$menu_id=$term[0]->term_id;
	if(!isset($menu_location[$menu_id])){return false;}
	if($single){return reset($menu_location[$menu_id]);}
	return $menu_location[$menu_id];
}



/*基本 menu_meta*/
function add_menu_meta($menu_item_id,$name,$value,$unique=false){
	return add_metadata('post',$menu_item_id,$name,$value,$unique);
}
function update_menu_meta($menu_item_id,$name,$value,$prev=''){
	return update_metadata('post',$menu_item_id,$name,$value,$prev);
}
function delete_menu_meta($menu_item_id,$name,$value=''){
	return delete_metadata('post',$menu_item_id,$name,$value);
}
function get_menu_meta($menu_item_id,$name,$single=false){
	return get_metadata('post',$menu_item_id,$name,$single);
}


?>