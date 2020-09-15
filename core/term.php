<?php
/*action*/
add_action('create_term',function($id,$tt_id,$tax){
	cp::get_template_part('term/'.$tax.'/action/create',false,['term_id'=>$id]);
},10,3);
add_action('edit_term',function($id,$tt_id,$tax){
	cp::get_template_part('term/'.$tax.'/action/update',false,['term_id'=>$id]);
},10,3);
add_action('delete_term',function($id,$tt_id,$tax){
	cp::get_template_part('term/'.$tax.'/action/delete',false,['term_id'=>$id]);
},10,3);


function get_term_taxonomy($term_id,$return_object=true){
	global $wpdb;
	$rsl=$wpdb->get_var("SELECT taxonomy FROM $wpdb->term_taxonomy WHERE term_id=$term_id");
	if($return_object)return get_taxonomy($rsl);
	return $rsl;
}

function get_tax_meta($tax,$name){
	$rtn=array();
	$terms=get_the_terms(get_the_id(),$tax);
	foreach($terms as $id=>$term){
		$rtn[$term->name]=get_term_meta($id,$name);
	}
	return $rtn;
}

/*term_meta*/
function get_all_output_term_meta($term){
	global $post_types,$meta_types;
	$rtn=array();
	$metas=$post_types[get_taxonomy($term->taxonomy)->object_type[0]]['taxonomies'][$term->taxonomy]['meta'];
	if(!empty($metas)){
		foreach($metas as $name=>$conf){
			$rtn[$name]=cp_get_output_meta('term',$name);
		}
	}
	$rtn['label']=$term->name;
	$rtn['slug']=$term->slug;
	$rtn['desc']=$term->description;
	return $rtn;
}