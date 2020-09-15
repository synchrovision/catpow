<?php
/*action*/
add_action('wp_insert_comment',function($id,$comment){
	cp::get_template_part(
		'post/'.get_post_type($comment->comment_post_ID).'/comment/'.$comment->comment_type.'/action/create',
		false,['comment_id'=>$id]
	);
},10,2);
add_action('edit_comment',function($id,$comment){
	cp::get_template_part(
		'post/'.get_post_type($comment->comment_post_ID).'/comment/'.$comment->comment_type.'/action/update',
		false,['comment_id'=>$id]
	);
},10,2);
add_action('delete_comment',function($id,$comment){
	cp::get_template_part(
		'post/'.get_post_type($comment->comment_post_ID).'/comment/'.$comment->comment_type.'/action/delete',
		false,['comment_id'=>$id]
	);
},10,2);
add_action('wp_insert_comment', function($id){
	if(!wp_verify_nonce($_POST['_cpnonce'],'insert_comment')){return;}
	remove_action('wp_insert_comment',__FUNCTION__);
	$comment_meta=cp::get_request_meta_data('comment',$id);
	cp_update_comment_meta($comment_meta,$id);
	do_action('cp_insert_comment',$id);
});


/*コメントフィルタ*/
add_action('comment_form_top',function(){
	wp_nonce_field('cp_comment_form','_cp_comment_form_nonce');
});
add_filter('pre_comment_approved',function($approved,$commentdata){
	if(is_wp_error($approved))return $approved;
	if(wp_verify_nonce($_POST['_cp_comment_form_nonce'],'cp_comment_form')!==1)return 'spam';
	return $approved;
});

?>