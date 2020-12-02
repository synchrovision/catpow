<?php
\cp::$content_path=\cp::get_the_content_path();
\cp::$content=\cp::get_the_content();

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
/*ページinit*/
if($file=cp::get_file_path(cp::$content_path.'/init.php',cp::FROM_THEME|cp::FROM_CONFIG)){
	include $file;
}

/*script style*/
$css_arr=[
	'style.css',
	'content.css',
	cp::$content_path.'/style.css',
	cp::$content_path.'/layout.css'
];
foreach($css_arr as $path){cp::enqueue_style($path);}
$js_arr=[
	'script.js',
	cp::$content_path.'/script.js'
];
foreach($js_arr as $path){cp::enqueue_script($path);}



/*admin bar*/
if(!current_user_can('edit_posts')){
	add_filter('show_admin_bar', '__return_false');
}