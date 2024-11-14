<?php
namespace Catpow;

/*action*/
add_action('wp_insert_post',function($id,$post,$update){
	if($update){cp::get_template_part('post/'.$post->post_type.'/action/update',false,['post_id'=>$id]);}
	else{cp::get_template_part('post/'.$post->post_type.'/action/create',false,['post_id'=>$id]);}
},10,3);
add_action('delete_post',function($id){
	cp::get_template_part('post/'.get_post_type($id).'/action/delete',false,['post_id'=>$id]);
});

?>