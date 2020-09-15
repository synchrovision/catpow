<?php
namespace Catpow;

global $post_types;
foreach($post_types as $post_type_name=>$post_type_data){
	foreach(array('検索'=>'search','メールフォーム'=>'mail','投稿フォーム'=>'post') as $tmp_label=>$tmp_name){
		if(isset($post_type_data['template']) and in_array($tmp_name,$post_type_data['template'])){
			add_filter("nav_menu_items_{$post_type_name}",function($posts,$args,$post_type)use($tmp_label,$tmp_name){
				array_unshift($posts,(object)array(
					'db_id'=>null,
					'menu_item_parent'=>null,
					'target'=>null,
					'attr_title'=>null,
					'classes'=>array(),
					'xfn'=>null,
					'title'=>$post_type->label.":{$tmp_label}",
					'object_id'=>$tmp_name.'_'.$args['post_type'],
					'object'=>$args['post_type'],
					'type'=>'custom',
					'url'=>home_url("/{$args['post_type']}/{$tmp_name}/")
				));
				return $posts;
			},10,3);
			add_filter('nav_menu_items_page',function($posts)use($tmp_label,$tmp_name,$post_type_name,$post_type_data){
				array_unshift($posts,(object)array(
					'ID'=>null,
					'db_id'=>null,
					'menu_item_parent'=>null,
					'target'=>null,
					'attr_title'=>null,
					'classes'=>array(),
					'xfn'=>null,
					'title'=>$post_type_data['label'].":{$tmp_label}",
					'object_id'=>"{$tmp_name}_{$post_type_name}",
					'object'=>$post_type_name,
					'type'=>'custom',
					'url'=>home_url("/{$post_type_name}/{$tmp_name}/")
				));
				return $posts;
			},10,3);
		}
	}
}
global $user_datas;
foreach((array)$user_datas as $user_data_name=>$user_data){
	foreach(array('マイページ'=>'me','検索'=>'search','登録'=>'register') as $tmp_label=>$tmp_name){
		if(isset($user_data['template']) and in_array($tmp_name,$user_data['template'])){
			add_filter('nav_menu_items_page',function($posts)use($tmp_label,$tmp_name,$user_data_name,$user_data){
				array_unshift($posts,(object)array(
					'ID'=>null,
					'db_id'=>null,
					'menu_item_parent'=>null,
					'target'=>null,
					'attr_title'=>null,
					'classes'=>array(),
					'xfn'=>null,
					'title'=>$user_data['label'].":{$tmp_label}",
					'object_id'=>"{$tmp_name}_{$user_data_name}",
					'object'=>$user_data_name,
					'type'=>'custom',
					'url'=>home_url("/{$user_data_name}/{$tmp_name}/")
				));
				return $posts;
			},10,3);
		}
	}
}

add_filter('wp_edit_nav_menu_walker',function(){return 'Catpow\\Walker_Nav_Menu_Edit_With_Meta';});

require_once( ABSPATH . 'wp-admin/includes/nav-menu.php' );
class Walker_Nav_Menu_Edit_With_Meta extends \Walker_Nav_Menu_Edit{
	public function start_el( &$output, $item, $depth=0, $args=array(),$id=0){
		parent::start_el($output,$item,$depth,$args,$id);

		foreach((array)get_menu_location($item->ID) as $i=>$location_name){
			if(empty($location_name) || empty($GLOBALS['nav_datas'][$location_name]['meta'])){continue;}
			ob_start();
			echo("<div class=\"menu-item-settings wp-clearfix {$location_name}\">");
			$sec=\cp::$content->sec('nav/'.$location_name.'/admin/form.php',$item->ID);
			printf('<input type="hidden" name="cp_form_section_ids[]" value="%s"/>',$sec->form_id);
			$sec->render();
			echo('</div>');
			$output.=ob_get_clean();
		}
	}
}
add_action('wp_update_nav_menu_item',function($menu_id,$menu_item_db_id,$args){
	if(empty($_REQUEST['cp_form_section_ids'])){return;}
	foreach((array)$_REQUEST['cp_form_section_ids'] as $sec_id){
		if(isset(cp::$forms[$sec_id])){
			$form=cp::$forms[$sec_id];
			$form->receive();
			CP::update_data($form->inputs->data,'nav/'.get_term($menu_id)->name.'/'.$menu_item_db_id);
			$form->clear();
		}
	}

},10,3);
