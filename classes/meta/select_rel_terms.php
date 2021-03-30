<?php
namespace Catpow\meta;

class select_rel_terms extends select{
	public static
		$value_type='NUMERIC',
		$data_type='bigint(20)';
	
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val))return false;
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
					break;
				case 'link':
					return vsprintf(
						'<a class="post_link %s" href="%s">%s</a>',
						[$term->taxonomy,get_term_link($val),$term->name]
					);
				case 'url':
					return get_term_link($val);
				default:
					global $taxonomies;
					if(in_array($prm,$taxonomies[$term->taxonomy]['template'])){
						$class_name=\cp::get_class_name('content');
						ob_start();
						$class_name::from_object($term)->render($prm);
						return ob_get_clean();
					}
					elseif(isset($taxonomies[$term->taxonomy]['meta'][$prm])){
						$meta=new \Catpow\content\meta(['data_path'=>'term/'.$term->taxonomy.'/'.$val.'/'.$prm]);
						return $meta->get_output();
					}
			}

		}
		elseif($addition){
			if(empty($val))$val=0;
			return array_key_exists($val,$addition)?$addition[$val]:reset($addition);
		}
	}
	
	public static function get_selections($meta){
		$q=is_callable($meta->conf['value'])?$meta->conf['value']($meta):$meta->conf['value'];
		$rtn=array();
		if(is_string($q))$q=new \WP_Term_Query(array('taxonomy'=>$q));
		if(is_array($q)){$q=new \WP_Term_Query($q);}
		if(is_object($q) and is_a($q,\cp::get_class_name('query','term'))){$q=$q->query;}
		if(isset($meta->conf['addition'])){
			if(is_string($meta->conf['addition'])){$rtn[$meta->conf['addition']]=0;}
			else{$rtn=$meta->conf['addition'];}
		}
		if(isset($meta->conf['sortby'])){
			global $taxonomies;
			$sortby=$meta->conf['sortby'];
			$sortby_meta=$taxonomies[$q->query_vars['taxonomy']]['meta'][$sortby];
			$meta_class_name=\cp::get_class_name('content','meta');
		}
		if(empty($meta->conf['input_loop'])){
			if(isset($sortby)){
				foreach($q->terms as $i=>$term){
					$sortby_meta_obj=new $meta_class_name([
						'data_path'=>'term/'.$term->taxonomy.'/'.$term->term_id.'/'.$sortby,
						'meta'=>$sortby_meta
					]);
					$rtn[$sortby_meta_obj->get_output()][$term->name]=$term->term_id;
				}
			}
			else{foreach($q->terms as $i=>$term){$rtn[$term->name]=$term->term_id;}}
		}
		else{
			if(is_array($meta->conf['input_loop'])){$type=$meta->conf['input_loop'][0];$name=$meta->conf['input_loop'][1];}
			elseif(is_string($meta->conf['input_loop'])){$type=$meta->conf['input_loop'];$name='loop';}
			else{$type='list';$name='loop';}
			$class_name=\cp::get_class_name('content');
			foreach($q->get_terms() as $term){
				ob_start();
				$class_name::from_object($term)->render($type,$name);
				if(isset($sortby)){
					$sortby_meta_obj=new $meta_class_name([
						'data_path'=>'term/'.$term->taxonomy.'/'.$term->term_id.'/'.$sortby,
						'meta'=>$sortby_meta
					]);
					$rtn[$sortby_meta_obj->get_output()][ob_get_clean()]=$term->term_id;
				}
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