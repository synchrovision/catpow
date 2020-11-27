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
//子カテゴリのテンプレート選択候補に親カテゴリのテンプレートを加える
add_filter('category_template_hierarchy',function($templates){
	$term=get_queried_object();
	if($term->parent>0){
		$ancestors=[];
		while(!empty($term->parent)){
			$ancestors[]=(int)$term->parent;
			$term=get_term($term->parent,'category');
			if(is_wp_error($term) || in_array($term->parent,$ancestors)){break;}
			array_splice($templates,-1,0,'category-'.$term->slug.'.php');
		}
	}
	return $templates;
});
add_filter('taxonomy_template_hierarchy',function($templates){
	$term=get_queried_object();
	if($term->parent>0){
		$ancestors=[];
		while(!empty($term->parent)){
			$ancestors[]=(int)$term->parent;
			$term=get_term($term->parent,$term->taxonomy);
			if(is_wp_error($term) || in_array($term->parent,$ancestors)){break;}
			array_splice($templates,-1,0,'taxonomy-'.$term->taxonomy.'-'.$term->slug.'.php');
		}
	}
	return $templates;
});