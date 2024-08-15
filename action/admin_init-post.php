<?php
namespace Catpow;


add_action('admin_bar_menu',function($wp_admin_bar){
	global $wpdb,$post;
	$wp_admin_bar->add_menu([
		'id'=>'clone_post',
		'title'=>'<span class="ab-icon"></span><span class="ad-label">'._('複製').'</span>',
		'href'=>add_query_arg(['action'=>'clone'])
	]);
	$expected_status=$post->post_type==='attachment'?'inherit':'publish';
	$prev_post_id=$wpdb->get_var("SELECT MAX(ID) FROM {$wpdb->posts} WHERE post_type = '{$post->post_type}' AND post_status = '{$expected_status}' AND ID < $post->ID");
	$next_post_id=$wpdb->get_var("SELECT MIN(ID) FROM {$wpdb->posts} WHERE post_type = '{$post->post_type}' AND post_status = '{$expected_status}' AND ID > $post->ID");
	if(isset($prev_post_id)){
		$first_post_id=$wpdb->get_var("SELECT MIN(ID) FROM {$wpdb->posts} WHERE post_type = '{$post->post_type}' AND post_status = '{$expected_status}'");
		if($first_post_id!==$prev_post_id){
			$wp_admin_bar->add_menu([
				'id'=>'first_post_edit',
				'title'=>'«',
				'href'=>add_query_arg(['post'=>$first_post_id])
			]);
		}
		$wp_admin_bar->add_menu([
			'id'=>'prev_post_edit',
			'title'=>'<',
			'href'=>add_query_arg(['post'=>$prev_post_id])
		]);
	}
	$wp_admin_bar->add_menu([
		'id'=>'select_post_edit',
		'title'=>'・・・'
	]);
	foreach(get_posts(['post_type'=>$post->post_type,'posts_per_page'=>20]) as $sibling_post){
		$wp_admin_bar->add_node(
			array(
				'parent'=>'select_post_edit',
				'id'=>'select_post_edit-'.$sibling_post->ID,
				'title'=>$sibling_post->post_title,
				'href'=>add_query_arg(['post'=>$sibling_post->ID])
			)
		);
	}
	if(isset($next_post_id)){
		$wp_admin_bar->add_menu([
			'id'=>'next_post_edit',
			'title'=>'>',
			'href'=>add_query_arg(['post'=>$next_post_id])
		]);
		$last_post_id=$wpdb->get_var("SELECT MAX(ID) FROM {$wpdb->posts} WHERE post_type = '{$post->post_type}' AND post_status = '{$expected_status}'");
		if($last_post_id!==$next_post_id){
			$wp_admin_bar->add_menu([
				'id'=>'last_post_edit',
				'title'=>'»',
				'href'=>add_query_arg(['post'=>$last_post_id])
			]);
		}
	}
},100);
add_action("post_action_clone",function($post_id){
	$query=new query\post($post_id);
	$data=$query->export()[0];
	unset($data['ID']);
	$new_post_id=query\post::import([$data])[0];
	wp_redirect(admin_url(sprintf('post.php?post=%d&action=edit',$new_post_id)));
	exit;
});
add_action('save_post', function($id,$post,$update){do_action('cp_save_post',$id,$post);},10,3);
add_action('attachment_updated',function($id,$post_after,$post_before){do_action('cp_save_post',$id,$post_after);},10,3);
add_action('cp_save_post',function($id,$post){
	if(did_action('cp_save_post')>1){return;}
	$form=CP::get_the_form();
	if(!empty($form)){
		try{
			$form->receive();
			$form->push();
			$form->clear();
		}
		catch(content\form_exception $e){
			if(isset($e->data['message'])){
				echo implode('<br/>',$e->data['message']);
				die();
			}
		}
	}
},10,2);
add_filter('use_block_editor_for_post',function($use_block_editor,$post){
	if($post->post_type==='page'){
		global $static_pages;
		if(!empty($static_pages[$post->post_name]['noeditor'])){
			remove_post_type_support('page','editor');
			return false;
		}
	}
	return $GLOBALS['post_types'][$post->post_type]['richedit']??$use_block_editor;
},11,2);
