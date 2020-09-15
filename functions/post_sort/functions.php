<?php
add_filter('posts_orderby',function($orderby){
	global $wpdb;
	return "{$wpdb->posts}.menu_order ASC,{$orderby}";
});


add_action('admin_init',function(){
	global $pagenow,$post_types;
	$post_type=empty($_GET['post_type'])?'post':$_GET['post_type'];
	if($pagenow=='edit.php' and is_user_logged_in() and !empty($post_types[$post_type]['sortable'])){
		wp_enqueue_script('jquery-ui');
		wp_enqueue_script('jquery-ui-sortable');
		wp_enqueue_script('cp_post_sort_script',plugins_url('script.js',__FILE__));	
	}
});

add_action('wp_ajax_cp_post_sort',function(){
	check_admin_referer('bulk-posts');
	global $wpdb;
	$ids=explode(',',$_REQUEST['sort_data']);
	$orders=array();
	$tgt_orders=array();
	$response['post']=get_post(reset($ids));
	$post_type=get_post_type(reset($ids));
	$all_ids=$wpdb->get_col("SELECT ID FROM {$wpdb->posts} WHERE post_type = '{$post_type}' ORDER BY menu_order ASC, post_date DESC");
	foreach($all_ids as $i => $id){$orders[$id]=$i+1;}
	foreach($ids as $id){$tgt_orders[]=$orders[$id];}
	sort($tgt_orders);
	foreach($ids as $i=>$id){$orders[$id]=$tgt_orders[$i];}
	$sql="UPDATE {$wpdb->posts} SET menu_order = CASE ID";
	foreach($orders as $id=>$order){$sql.=" WHEN {$id} THEN {$order}";}
	$sql.=" END WHERE post_type = '{$post_type}'";
	$wpdb->get_results($sql);
	printf('%s(%s);',$_REQUEST['callback'],json_encode($orders));
	die();
});