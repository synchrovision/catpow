<?php 
global $current_screen;
cp::enqueue_style('admin.css');
cp::enqueue_script('admin.js');
cp::enqueue_style('content.css');


if($current_screen->base=='edit'){
	wp_enqueue_script('cpform');
}
elseif($current_screen->base=='post'){
	add_editor_style('https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
	if($current_screen->post_type=='page'){
		$page_name=isset($_GET['post'])?(get_post($_GET['post'])->post_name):'default';
		
		cp::enqueue_style('page/'.$page_name.'/single/style.css');
		cp::enqueue_style('page/'.$page_name.'/admin/style.css');
		
		cp::enqueue_script('page/'.$page_name.'/admin/script.js');
		
		add_editor_style('page/'.$page_name.'/single/style.css');
		add_editor_style('page/'.$page_name.'/admin/style.css');
		
		add_filter('admin_body_class',function($class)use($page_name){
			return $class.sprintf(' %1$s %1$s-single %1$s-admin',' page-'.$page_name);
		});
	}
	else{
		
		cp::enqueue_style('post/'.$current_screen->post_type.'/single/style.css');
		cp::enqueue_style('post/'.$current_screen->post_type.'/admin/style.css');
		
		cp::enqueue_script('post/'.$current_screen->post_type.'/admin/script.js');
		
		add_editor_style('post/'.$current_screen->post_type.'/single/style.css');
		add_editor_style('post/'.$current_screen->post_type.'/admin/style.css');
		
		add_filter('admin_body_class',function($class)use($current_screen){
			return $class.sprintf(' %1$s %1$s-single %1$s-admin','post-'.$current_screen->post_type);
		});
	}
}
elseif($current_screen->base=='edit-tags'){
	cp::enqueue_style('tax-admin','term/'.$current_screen->taxonomy.'/admin/style.css');
}
elseif($current_screen->base=='nav-menus'){
	global $nav_datas;
	foreach(array_keys($nav_datas) as $menu_name){
		cp::enqueue_style("menu/{$menu_name}/admin/style.css");
	}
}
elseif($current_screen->base=='toplevel_page_catpow'){
	cp::enqueue_script('catpow/main/admin/script.js');
	cp::enqueue_style('catpow/main/admin/style.css');
}

/*post_meta*/
global $wp_query,$post_types,$static_pages;
function _cp_post_edit_form($post,$box){
	$sec_class=\cp::get_class_name('content','form_section');
	$sec=$sec_class::from_object($post,'admin/form.php');
	
	wp_enqueue_script('cpform');
	cp::enqueue_style('content.css');
	cp::enqueue_style($sec->path.'/style.css');
	cp::enqueue_script($sec->path.'/script.css');

	wp_nonce_field('cpform','_cpform_nonce');
	printf('<input type="hidden" name="cpform_section_id" value="%s"/>',$sec->form_id);
	
	$sec->render();
	
}
foreach($post_types as $post_type=>$data){
	if(empty($data['meta'])){continue;}
	add_meta_box('cpcf_custom_box',"CF <small>{$post_type}</small>",'_cp_post_edit_form',$post_type,'normal','high');
}
add_meta_box('cpcf_custom_box','CF <small>page</small>','_cp_post_edit_form','page','normal','high');


add_action('post_edit_form_tag', function(){echo ' enctype="multipart/form-data"';});

/*term_meta*/
global $post_types;
if($current_screen->base=='term'){
	add_action($current_screen->taxonomy.'_term_edit_form_tag',function($term){
		echo('enctype="multipart/form-data"');
	});
	add_action($current_screen->taxonomy.'_edit_form',function($term){
		global $current_screen;
		$tmp_path='term/'.$current_screen->taxonomy;
		
		wp_nonce_field('insert_post','_cpnonce');
		wp_enqueue_script('cpform');
		cp::enqueue_style('content.css');
		cp::enqueue_style('style.css');
		cp::enqueue_style($tmp_path.'/admin/style.css');
		cp::enqueue_script($tmp_path.'/admin/script.js');
		
		$sec=\cp::$content->sec($tmp_path.'/admin/form.php',$term->term_id);
		printf('<input type="hidden" name="cpform_section_id" value="%s"/>',$sec->form_id);
		$sec->render();
	});
}