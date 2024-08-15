<?php
namespace Catpow\meta;

class select_terms extends select{
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
	public static function get_rel_data_value($relkey,$vals,$conf){
		$values=[];
		$relkey=\Catpow\data_type\term::$key_translation[$relkey]??$relkey;
		if(in_array($relkey,\Catpow\query\term::$data_keys)){
			foreach((array)$vals as $id){
				$values[]=[get_term($id)->$relkey];
			}
		}
		else{
			$terms=array_map('get_term',(array)$vals);
			usort($terms,function($a,$b){
				$rtn=$a->count<=>$b->count;
				if($rtn===0){$rtn=$a->parent<=>$b->parent;}
				return $rtn;
			});
			foreach($terms as $term){
				$values[]=\cp::get_the_meta_value("term/".$term->taxonomy."/{$term->term_id}/{$relkey}")?:[];
			}
		}
		return call_user_func_array('array_merge',$values);
	}
	
	public static function export($data_type,$data_name,$id,$meta_name,$conf){
		$vals=static::get($data_type,$data_name,$id,$meta_name,$conf);
		if(!empty($conf['export']) && in_array($conf['export'],['slug','name'])){
			$field=$conf['export'];
			foreach($vals as $i=>$val){
				$vals[$i]=get_term($val)->$field;
			}
		}
		return $vals;
	}
	public static function import($data_type,$data_name,$id,$meta_name,$vals,$conf){
		if(!empty($conf['export']) && in_array($conf['export'],['slug','name'])){
			$taxonomy=is_string($conf['value'])?$conf['value']:$conf['value']['taxonomy'];
			if(is_array(reset($vals))){$vals=reset($vals);}
			foreach($vals as $i=>$val){
				$vals[$i]=term_exists($val,$taxonomy)['term_id']??wp_insert_term($val,$taxonomy)['term_id'];
			}
		}
		return static::set($data_type,$data_name,$id,$meta_name,$vals,$conf);
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
			if(empty($term)){return '';}
			if(empty($prm)){return $term->name;}
			$tax=$term->taxonomy;
			global $taxonomies;
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
			switch($prm){
				case 'id':
					return $term->term_id;
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
			}
		}
		elseif($addition){
			if(empty($val))$val=0;
			return array_key_exists($val,$addition)?$addition[$val]:reset($addition);
		}
	}
	
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		$q=is_callable($conf['value'])?$conf['value']():$conf['value'];
		if(is_string($q)){$q=['taxonomy'=>$q];}
		if(is_object($q) and is_a($q,\cp::get_class_name('query','term'))){$q=$q->q;}
		
		$q['terms']=$input['value'];
		if(!is_numeric($input['value'][0])){$q['field']='slug';}
		if(isset($input['compare'])){
			$q['operator']=[
				'='=>'IN',
				'!='=>'NOT IN'
			][$input['compare']]??$input['compare'];
		}
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
		if(isset($q)){
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
							if(isset($rtn[$term->name]) && $rtn[$term->name]!==$term->term_id){
								$rtn[$term->name.'('.$term->slug.')']=$term->term_id;
								continue;
							}
							$rtn[$term->name]=$term->term_id;
							$term_group_name='[ '.$term->name.' ]';
							$term_group_names[$term->term_id]=$term_group_name;
							if(!isset($rtn[$term_group_name])){$rtn[$term_group_name]=[];}
						}
						else{
							if(!isset($term_group_names[$term->parent])){
								$parent_term=get_term($term->parent,$term->taxonomy);
								$rtn[$parent_term->name]=$term->parent;
								$term_group_name='[ '.$parent_term->name.' ]';
								$term_group_names[$term->parent]=$term_group_name;
								if(!isset($rtn[$term_group_name])){$rtn[$term_group_name]=[];}
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