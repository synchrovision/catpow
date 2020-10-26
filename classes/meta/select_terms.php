<?php
namespace Catpow\meta;

class select_terms extends meta{
	public static
		$value_type='NUMERIC',
		$data_type='bigint(20)';
	
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		global $wpdb;
		if(!is_numeric($id)){return false;}
		$q=$conf['value'];
		if(is_string($q)){$tax=$q;}
		if(is_array($q)){$tax=$q['taxonomy'];}
		if(is_object($q) and is_a($q,\cp::get_class_name('query','term'))){$tax=$q->query->taxonomy;}
		return $wpdb->get_col(
			"SELECT tt.term_id
			FROM {$wpdb->term_relationships} tr
			LEFT JOIN {$wpdb->term_taxonomy} tt
			ON tr.term_taxonomy_id = tt.term_taxonomy_id
			WHERE tr.object_id = {$id}
			AND tt.taxonomy = '{$tax}'"
		);
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		foreach($vals as &$val){$val=(int)$val;}
		$taxonomy=is_string($conf['value'])?$conf['value']:$conf['value']['taxonomy'];
		wp_set_object_terms($id,$vals,$taxonomy);
	}
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		foreach($vals as &$val){$val=(int)$val;}
		$taxonomy=is_string($conf['value'])?$conf['value']:$conf['value']['taxonomy'];
		$vals=array_merge($vals,wp_get_object_terms($id,$taxonomy,['fields'=>'ids']));
		wp_set_object_terms($id,$vals,$taxonomy);
	}
	
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val))return '';
		if(isset($meta->conf['addition'])){
			if(is_string($meta->conf['addition'])){$addition=[0=>$meta->conf['addition']];}
			else{$addition=array_flip($meta->conf['addition']);}
		}
		else{$addition=false;}
		if(is_numeric($val) && $val>0){
			$term=get_term($val);
			switch($prm){
				case false:
				case 'title':
					return $term->name;
				case 'icon':
					return sprintf(
						'<span class="icon term %s %s">%s</span>',
						$term->slug,$term->taxonomy,$term->name
					);
				case 'link':
					return sprintf(
						'<a class="term_link %s %s" href="%s">%s</a>',
						$term->slug,$term->taxonomy,get_term_link($term),$term->name
					);
				case 'url':
					return get_term_link($term);
				default:
					global $taxonomies;
					$tax=$term->taxonomy;
					if(in_array($prm,$taxonomies[$tax]['template'])){
						$class_name=\cp::get_class_name('content','loop');
						ob_start();
						$class_name::from_object($term)->render($prm);
						return ob_get_clean();
					}
					elseif(isset($taxonomies[$tax]['meta'][$prm])){
						$meta=new \Catpow\content\meta(['data_path'=>'term/'.$tax.'/'.$val.'/'.$prm]);
						return $meta->get_output();
					}
			}
		}
		elseif($addition){
			if(empty($val))$val=0;
			return array_key_exists($val,$addition)?$addition[$val]:reset($addition);
		}
	}
	public static function input($meta,$prm){
		$sels=self::get_selections($meta);
		return select::get_input($meta->the_data_path,$meta->conf,$sels,$meta->value);
	}
	
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		$q=is_callable($conf['value'])?$conf['value']():$conf['value'];
		if(is_string($q)){$q=['taxonomy'=>$q];}
		if(is_object($q) and is_a($q,\cp::get_class_name('query','term'))){$q=$q->q;}
		
		$q['terms']=$input['value'];
		if(isset($input['compare'])){$q['operator']=$input['compare'];}
		if(isset($input['include_children'])){$q['include_children']=$input['include_children'];}
		$query['tax_query'][]=$q;
	}
	public static function reflect_to_order(&$order_data,$data_type,$data_name,$meta_name,$conf){
		return false;
	}
	public static function fill_conf(&$conf){
		if(!isset($conf['value'])){$conf['value']=$conf['name'];}
	}
	
	
	public static function get_selections($meta){
		$q=is_callable($meta->conf['value'])?$meta->conf['value']($meta):$meta->conf['value'];
		$rtn=array();
		if(is_string($q))$q=new \WP_Term_Query(array('taxonomy'=>$q,'hide_empty'=>false,'orderby'=>'term_group'));
		if(is_array($q)){$q=new \WP_Term_Query($q);}
		if(is_object($q) and is_a($q,\cp::get_class_name('query','term'))){$q=$q->query;}
		if(isset($meta->conf['addition'])){
			if(is_string($meta->conf['addition'])){$rtn[$meta->conf['addition']]=0;}
			else{$rtn=$meta->conf['addition'];}
		}
		if(isset($meta->conf['sortby'])){
			global $taxonomies;
			$sortby=$meta->conf['sortby'];
			$sortby_conf=$taxonomies[$q->query_vars['taxonomy']]['meta'][$sortby];
		}
		if(empty($meta->conf['input_loop'])){
			if(isset($sortby)){
				foreach($q->get_terms() as $i=>$term){
					$rtn[reset(\cp::get_output($sortby_conf,get_term_meta($term->term_id,$sortby,true)))][$term->name]=$term->term_id;
				}
			}
			else{
				$term_group_names=[];
				foreach($q->get_terms() as $i=>$term){
					if(empty($term->parent)){
						if(isset($rtn[$term->name])){continue;}
						$rtn[$term->name]=$term->term_id;
						$term_group_names[$term->term_id]='[ '.$term->name.' ]';
						$rtn[$term_group_names[$term->term_id]]=[];
					}
					else{
						if(!isset($term_group_names[$term->parent])){
							$parent_term=get_term($term->parent,$term->taxonomy);
							$rtn[$parent_term->name]=$term->parent;
							$term_group_names[$term->parent]='[ '.$parent_term->name.' ]';
							$rtn[$term_group_names[$term->parent]]=[];
						}
						$rtn[$term_group_names[$term->parent]][$term->name]=$term->term_id;
					}
				}
				$rtn=array_filter($rtn);
			}
		}
		else{
			if(is_array($meta->conf['input_loop'])){$tmp=$meta->conf['input_loop'][0];$name=$meta->conf['input_loop'][1];}
			elseif(is_string($meta->conf['input_loop'])){$tmp=$meta->conf['input_loop'];$name='loop';}
			else{$tmp='listed';$name='loop';}
			$class_name=\cp::get_class_name('content','loop');
			$loop=new $class_name(['path'=>'term/'.$tmp,'query'=>$q]);
			foreach($loop as $i=>$term){
				ob_start();
				if(isset($sortby)){$rtn[reset(\cp::get_output($sortby_conf,get_term_meta($term->term_id,$sortby,true)))][ob_get_clean()]=$term->term_id;}
				else{$rtn[ob_get_clean()]=$term->term_id;}
			}
		}
		if(isset($sortby)){ksort($rtn);}
		if(isset($meta->conf['addition'])){
			if(is_array($meta->conf['addition'])){$rtn=array_merge($rtn,$meta->conf['addition']);}
			else{$rtn[$meta->conf['addition']]=0;}
		}
		return $rtn;
	}
}
?>