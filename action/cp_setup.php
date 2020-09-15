<?php
/*
plugins_loaded:10 => cp_setup:20
init and register post types,taxonomies,theme supports ...etc, with global vars
this file is included in plugins_loaded hook 
so you have chance to extend them with other plugins 
*/
global $is_auth_ip,$ajax_response,$auth_ip,
$post_types,$taxonomies,$static_pages,$comment_datas,
$menu_datas,$user_datas,$site_datas,$view_datas,$sidebar_datas,$use_widgets,
$wp_query,$cp_mode,$catpow_extensions;


array_walk($post_types,function(&$post_type_data,$post_type_name){
	global $taxonomies,$comment_datas;
	$post_type_data['name']=$post_type_name;
	if(isset($post_type_data['taxonomies'])){
		foreach($post_type_data['taxonomies'] as $key => $val){
			$tax_name=is_string($val)?$val:$key;
			if(isset($taxonomies[$tax_name])){
				if(!isset($taxonomies[$tax_name]['post_type']))$taxonomies[$tax_name]['post_type']=array();
				$taxonomies[$tax_name]['post_type'][]=$post_type_name;
			}else{
				$taxonomies[$tax_name]=array('post_type'=>array($post_type_name));
			}
			if(is_array($val)){
				$taxonomies[$tax_name]=array_merge($val,$taxonomies[$tax_name]);
			}
		}
	}
	$post_type_data['taxonomies']=array();
	if(isset($post_type_data['comments'])){
		foreach($post_type_data['comments'] as $key => $val){
			$comment_data_type=is_string($val)?$val:$key;
			if(isset($comment_datas[$comment_data_type])){
				if(!isset($comment_datas[$comment_data_type]['post_type']))$comment_datas[$comment_data_type]['post_type']=array();
				$comment_datas[$comment_data_type]['post_type'][]=$post_type_name;
			}else{
				$comment_datas[$comment_data_type]=array('post_type'=>array($post_type_name));
			}
			if(is_array($val)){
				$comment_datas[$comment_data_type]=array_merge($val,$comment_datas[$comment_data_type]);
			}
		}
	}
	$post_type_data['comments']=array();
});

cp::conf_data_walk(function($data_type,$data_name,&$conf_data){
	cp::fill_conf_data($data_type,$data_name,$conf_data);
});

$post_types_to_register=array();
$post_formats_to_support=array();
$is_support_post_thumbnails=false;
foreach($post_types as $type=>&$type_vals){
	$supports=array('title','editor');
	if(!empty($type_vals['comments']))array_push($supports,'comments');
	if(isset($type_vals['post-formats'])){
		array_push($supports,'post-formats');
		$post_formats_to_support=array_unique(array_merge($post_formats_to_support,$type_vals['post-formats']));
	}
	if(!empty($type_vals['supports']))$supports=$type_vals['supports'];
	if(!empty($type_vals['hierarchical']))$supports[]='page-attributes';
	if(in_array('thumbnail',$supports))$is_support_post_thumbnails=true;
	switch($type){
		case 'post':
		case 'attachment':
		case 'page':
		case 'wp_block':
			global $wp_post_types;
			if($type_vals['label']!==$type){
				add_filter("post_type_labels_{$type}",function($labels)use($type_vals){
					$labels->name=
					$labels->singular_name=
					$labels->menu_name=
					$labels->name_admin_bar=
						$type_vals['label'];
					return $labels;
				});
			}
			$wp_post_types[$type]->has_archive=in_array('archive',$type_vals['template']);
			break;
		default:
			$prm=[
				'labels'=>array('name' =>$type_vals['label'],'singular_name'=>$type),
				'public'=>$type_vals['public']??(in_array('mail',(array)$type_vals['template'])?false:true),
				'has_archive'=>$type_vals['has_archive']??in_array('archive',(array)$type_vals['template']),
				'menu_icon'=>$type_vals['menu_icon']??'dashicons-admin-page',
				'menu_position'=>$type_vals['menu_position']??null,
				'show_ui'=>current_user_can($type_vals['capability']??'edit_others_posts'),
				'show_in_rest'=>$type_vals['richedit']??true,
				'show_in_menu'=>$type_vals['show_in_menu']??true,
				'hierarchical'=>$type_vals['hierarchical']??false,
				'supports'=>$supports
			];
			$ico=get_stylesheet_directory().'/config/menu_icon/'.$type.'.png';
			if(file_exists(get_stylesheet_directory().'/config/menu_icon/'.$type.'.png'))
			$prm['menu_icon']=get_stylesheet_directory_uri().'/config/menu_icon/'.$type.'.png';
			$post_types_to_register[$type]=$prm;
			
	}
}
add_action('after_setup_theme',function()use($post_formats_to_support,$is_support_post_thumbnails){
	add_theme_support('post-formats',$post_formats_to_support);
	if($is_support_post_thumbnails)add_theme_support('post-thumbnails');
});
add_action('init',function()use($post_types_to_register){
	global $taxonomies;
	foreach($post_types_to_register as $type=>$prm){
		register_post_type($type,$prm);
	}
	$default_tax_data=array('sort'=>true,'hierarchical'=>true,'show_in_rest'=>true);
	foreach($taxonomies as $tax_name=>$tax_data){
		register_taxonomy($tax_name,$tax_data['post_type'],array_merge($default_tax_data,(array)$tax_data));
	}
});


if(!empty($sidebar_datas)){
	foreach($sidebar_datas as $sidebar_name=>$sidebar_data){
		register_sidebar(array(
			'name' => isset($sidebar_data['label'])?$sidebar_data['label']:$sidebar_name,
			'id' => $sidebar_name,
			'description' => isset($sidebar_data['desc'])?$sidebar_data['desc']:$sidebar_name,
			'before_widget' => '<li id="%1$s" class="widget %2$s">',
			'after_widget'  => '</li>',
			'before_title'  => '<h2>',
			'after_title'   => '</h2>',
		));
	}
}
if(!empty($use_widgets)){
	foreach($use_widgets as $widget){
		register_widget(cp::get_class_name('widget',$widget));
	}
}
