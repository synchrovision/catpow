<?php
\cp::$content_path=\cp::get_the_content_path();
\cp::$content=\cp::get_the_content();
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