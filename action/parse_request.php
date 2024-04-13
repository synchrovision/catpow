<?php
if(!empty($wp->query_vars['cp_callee'])){
	$param=explode('/',$wp->query_vars['cp_callee']);
	cp::include_plugin_file('functions/'.$param[0].'/callee/'.$param[1],['action'=>$param[2]??null]);
	die();
}
add_action('parse_query',function($wp){
	if(isset($wp->query_vars['cp_mode'])){
		$wp->is_home=false;
		if($wp->query_vars['cp_data_type']==='post' && $wp->query_vars['cp_page_type']==='single'){
			$wp->is_singular=true;
			$wp->is_page=$wp->query_vars['cp_data_name']==='page';
			$wp->is_attachment=$wp->query_vars['cp_data_name']==='attachment';
			$wp->is_single=!$wp->is_page && !$wp->is_attachment;
		}
		if($wp->query_vars['cp_data_type']==='post' && $wp->query_vars['cp_page_type']==='archive'){
			$wp->is_archive=$wp->is_post_type_archive=true;
		}
	}
});