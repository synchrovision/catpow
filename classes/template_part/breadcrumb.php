<?php
namespace Catpow\template_part;

abstract class breadcrumb extends template_part{
	public static function render(array $param=[]):void{
		$links=self::get_items($param);
		$class_name=$param['container_class']??'wp-block-catpow-breadcrumb';
		printf('<div class="%s"><ul class="%1$s-items">',$class_name);

		$position=1;
		$length=count($links);
		$json_ld_itemlist=[];
		foreach($links as $name => $val){
			if(is_array($val)){
				printf('<li class="%s-items-item is-multiple">',$class_name);
				foreach($val as $n => $v){
					printf('<a class="%s-items-item-link" href="%s">%s</a>',$class_name,$v,$n);
					$json_ld_itemlist[]=[
						'@type'=>'ListItem',
						'position'=>$position,
						'item'=>['@id'=>$val,'name'=>$name]
					];
				}
				printf('</li>');
			}
			else{
				printf(
					'<li class="%s-items-item%s"><a class="%1$s-items-item-link" href="%s">%s</a></li>',
					$class_name,
					$position===1?' is-home':'',
					$val,$name
				);
				$json_ld_itemlist[]=[
					'@type'=>'ListItem',
					'position'=>$position,
					'item'=>['@id'=>$val,'name'=>$name]
				];
			}
			$position++;
		}
		echo('</ul></div>');

		$json_ld=['@context'=>'http://schema.org','@type'=>'BreadcrumbList','itemListElement'=>$json_ld_itemlist];
		echo('<script type="application/json-ld">');
		echo json_encode($json_ld);
		echo('</script>');

	}
	public static function get_items($param=[]){
		global $post,$wp_query,$post_types,$wp_post_types;
		$links=array();
		if(empty($param['home_name'])){
			if(get_option('show_on_front')==='page'){
				$param['home_name']=get_the_title(get_option('page_on_front'));
			}
			else{$param['home_name']='Home';}
		}
		$links[$param['home_name']]=home_url();
		if(is_front_page()){return $links;}
		if(is_search()){return $links;}
		if(is_archive()){
			if(is_post_type_archive()){
				$links[$post_types[$wp_query->query_vars['post_type']]['label']]=get_post_type_archive_link($wp_query->query_vars['post_type']);
			}
			else{
				$post_type=$wp_query->posts[0]->post_type;
				if(isset($post_types[$post_type]['archive_page'])){
					$archive_page_name=basename($post_types[$post_type]['archive_page']);
					$archive_page_conf=$GLOBALS['static_pages'][$archive_page_name];
					$links[$archive_page_conf['label']]=get_permalink(get_page_by_path($post_types[$post_type]['archive_page']));
				}
				elseif($wp_post_types[$post_type]->has_archive){
					$links[$post_types[$post_type]['label']]=get_post_type_archive_link( $post_type );
				}
			}
			if(is_category()){
				$anc=array_reverse(get_ancestors($wp_query->query_vars['cat'],'category'));
				foreach($anc as $i=>$id){
					$links[get_cat_name($id)]=get_category_link($id);
				}
				$links[get_cat_name($wp_query->query_vars['cat'])]=get_category_link($wp_query->query_vars['cat']);
			}
			else if(is_tag()){
				$links[$wp_query->query_vars['tag']]=get_tag_link($wp_query->query_vars['tag_id']);
			}
			else if(is_tax()){
				$org_term=get_term_by('slug',$wp_query->query_vars['term'],$wp_query->query_vars['taxonomy']);
				$anc=array_reverse(get_ancestors($org_term->term_id,$org_term->taxonomy));
				foreach($anc as $i=>$id){
					$term=get_term_by('id',$id,$wp_query->query_vars['taxonomy']);
					$links[$term->name]=get_term_link($term);
				}
				$links[$org_term->name]=get_term_link($org_term);
			}
			return $links;
		}
		if(is_single()){
			$post_type=get_post_type();
			$templates=(array)$post_types[$post_type]['template'];
			if(isset($post_types[$post_type]['archive_page'])){
				$archive_page_name=basename($post_types[$post_type]['archive_page']);
				$archive_page_conf=$GLOBALS['static_pages'][$archive_page_name];
				$links[$archive_page_conf['label']]=get_permalink(get_page_by_path($post_types[$post_type]['archive_page']));
			}
			elseif($wp_post_types[$post_type]->has_archive){
				$links[$post_types[$post_type]['label']]=get_post_type_archive_link($post_type);
			}
			if(in_array('archive',$templates)){
				$cats=array();
				foreach($post_types[$post_type]['taxonomies'] as $tax_name=>$tax_prm){
					if($tax_name === 'category'){$terms=get_the_category($post->ID);}
					else{$terms=get_the_terms($post->ID,$tax_name);}
					if(!empty($terms)){$cats=array_merge($cats,$terms);}
				}
				$links['tax']=array();
				foreach($cats as $i=>$cat){
					$links['tax'][$cat->name]=get_term_link($cat);
				}
				if(empty($links['tax'])){unset($links['tax']);}
			}
			$links[get_the_title()]=get_permalink();
			return $links;
		}
		if(is_page()){
			$anc=array_reverse(get_post_ancestors(get_the_ID()));
			foreach($anc as $i=>$id){
				$links[get_the_title($id)]=get_permalink($id);
			}
			$links[get_the_title()]=get_permalink();
			return $links;
		}
		$links[\cp::get_the_content()->conf['label']]='';
		return $links;
	}
}

?>