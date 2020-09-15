<?php
add_filter('get_terms_orderby',function($orderby){
	if(empty($orderby)){return 'tm.meta_value';}
	return " tm.meta_value ASC,".$orderby;
});
add_filter('terms_clauses',function($clauses){
	global $wpdb;
	$clauses['join'].=" LEFT JOIN {$wpdb->termmeta} AS tm ON tm.term_id = tt.term_taxonomy_id AND tm.meta_key = 'term_order'";
	return $clauses;
});


add_action('admin_init',function(){
	global $pagenow,$taxonomies;
	$tax=$_GET['taxonomy']??'category';
	if($pagenow=='edit-tags.php' and is_user_logged_in() and !empty($taxonomies[$tax]['sortable'])){
		wp_enqueue_script('jquery-ui');
		wp_enqueue_script('jquery-ui-sortable');
		wp_enqueue_script('cp_term_sort_script',plugins_url('script.js',__FILE__));	
	}
});

add_action('wp_ajax_cp_term_sort',function(){
	check_admin_referer('bulk-tags');
	$ids=explode(',',$_REQUEST['sort_data']);
	foreach($ids as $i=>$id){update_term_meta($id,'term_order',$i+1);}
	printf('%s(%s);',$_REQUEST['callback'],json_encode($ids));
	
	die();
});