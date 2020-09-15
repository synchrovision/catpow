<?php
//子ページのテンプレート選択候補に親ページのテンプレートを加える
add_filter('page_template_hierarchy',function($templates){
	$page=get_queried_object();
	if($page->post_parent>0){
		foreach($page->ancestors as $parent){
			$parent=get_post($parent);
			if($parent && $parent->post_name){
				array_splice($templates,-1,0,'page-'.$parent->post_name.'.php');
			}
		}
	}
	return $templates;
});