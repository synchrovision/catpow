<?php
\cp::session_start();
\cp::$content_path=\cp::get_the_content_path();
\cp::$content=\cp::get_the_content();

if(property_exists(\cp::$content,'valid') && empty(\cp::$content->valid)){
	header('HTTP/1.0 403 Forbidden');
	exit;
}

/*file*/
if(get_query_var('cp_page_type')==='file'){
	$path=\cp::$content_path.'/'.get_query_var('cp_file_path');
	if(strpos($path,'../') || strpos($path,'..¥') || substr($path,-4)==='.php'){
		header('HTTP/1.0 403 Forbidden');
		exit;
	}
	if($file=cp::get_file_path($path,cp::FROM_THEME|cp::FROM_CONFIG)){
		Catpow\util\response::output($file);
	}
	if(cp::get_template_part($path.'.php')){exit;}
	header('HTTP/1.0 404 NotFound');
	exit;
}
/*page init*/
if($file=cp::get_file_path(cp::$content_path.'/init.php',cp::FROM_THEME|cp::FROM_CONFIG)){
	include $file;
}
cp::enqueue_style('style.css');
cp::enqueue_style('content.css');
cp::enqueue_style(cp::$content_path.'/style.css');
cp::enqueue_style(cp::$content_path.'/layout.css');
cp::enqueue_script(cp::$content_path.'/script.js');

/*admin bar*/
if(!current_user_can('edit_posts')){
	add_filter('show_admin_bar', '__return_false');
}
add_filter(get_query_var('cp_page_type').'_template_hierarchy',function($templates){
	array_unshift(
		$templates,
		get_query_var('cp_page_type').
		'-'.get_query_var('cp_data_name').
		'--'.get_query_var('cp_tmp_slug').'.php'
	);
	return $templates;
});