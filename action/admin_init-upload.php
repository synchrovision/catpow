<?php
namespace Catpow;

add_filter( 'manage_upload_sortable_columns',function($columns){
	global $wp_query;
	$columns['ID']=array('ID',(isset($wp_query->query['order']) and $wp_query->query['order']!=='desc'));
	return $columns;
});
add_filter( 'manage_upload_columns',function($columns){
	$columns['ID']='ID';
	return $columns;
});
add_action( 'manage_media_custom_column', function($column_name,$post_id){
	if($column_name=='ID')echo $post_id; return;
},10,2);
