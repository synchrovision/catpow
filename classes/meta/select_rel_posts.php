<?php
namespace Catpow\meta;

class select_rel_posts extends select{
	public static
		$value_type='NUMERIC',
		$data_type='bigint(20)';
	
	public static function get_rel_data_value($relkey,$vals,$conf){
		$values=[];
		$relkey=\Catpow\data_type\post::$key_translation[$relkey]??$relkey;
		if(in_array($relkey,\Catpow\query\post::$data_keys)){
			foreach($vals as $id){
				$values[]=[get_post($id)->$relkey];
			}
		}
		else{
			foreach($vals as $id){
				$values[]=\cp::get_the_meta_value("post/".get_post_type($id)."/{$id}/{$relkey}")?:[];
			}
		}
		return call_user_func_array('array_merge',$values);
	}
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val))return false;
		if(isset($meta->conf['addition'])){
			if(is_string($meta->conf['addition'])){$addition=[0=>$meta->conf['addition']];}
			else{$addition=array_flip($meta->conf['addition']);}
		}
		else{$addition=false;}
		if(is_numeric($val) && $val>0){
			switch($prm){
				case false:
				case 'title':
					return '<span class="select_item">'.get_the_title($val).'</span>';
				case 'content':
					return str_replace(']]>',']]&gt;',apply_filters('the_content',get_post($val)->post_content));
				case 'link':
					return vsprintf(
						'<a class="post_link %s" href="%s">%s</a>',
						[get_post_type($val),get_permalink($val),get_the_title($val)]
					);
				case 'tag':
					return vsprintf(
						'<a class="tag %s" href="%s">%s</a>',
						[implode(' ',get_post_meta($val,'post_class')?:[]),get_permalink($val),get_the_title($val)]
					);
				case 'url':
					return get_permalink($val);
				default:
					global $post_types;
					$post_type=get_post_type($val);
					if(in_array($prm,$post_types[$post_type]['template'])){
						$class_name=\cp::get_class_name('content');
						ob_start();
						$class_name::from_object(get_post($val))->render($prm);
						return ob_get_clean();
					}
					elseif(isset($post_types[$post_type]['meta'][$prm])){
						$meta=new \Catpow\content\meta(['data_path'=>'post/'.$post_type.'/'.$val.'/'.$prm]);
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
		if(is_string($q))$q=new \WP_query(array('post_type'=>$q,'nopaging'=>true));
		if(is_array($q)){if(!isset($q['nopaging']))$q['nopaging']=true;$q=new \WP_query($q);}
		if(is_object($q) and is_a($q,\cp::get_class_name('query','post'))){$q=$q->query;}
		if(isset($meta->conf['addition'])){
			if(is_string($meta->conf['addition'])){$rtn[$meta->conf['addition']]=0;}
			else{$rtn=$meta->conf['addition'];}
		}
		if(isset($meta->conf['sortby'])){
			global $post_types;
			$sortby=$meta->conf['sortby'];
			$sortby_meta=$post_types[$q->query_vars['post_type']]['meta'][$sortby];
			$meta_class_name=\cp::get_class_name('content','meta');
		}
		if(empty($meta->conf['input_loop'])){
			if(isset($sortby)){
				foreach($q->posts as $i=>$post){
					$sortby_meta=new $meta_class_name([
						'data_path'=>'post/'.$post->post_type.'/'.$post->ID.'/'.$sortby,
						'meta'=>$sortby_meta
					]);
					$rtn[$sortby_meta->get_output()][$post->post_title]=$post->ID;
				}
			}
			else{foreach($q->posts as $i=>$post){$rtn[$post->post_title]=$post->ID;}}
		}
		else{
			global $post;
			if(is_array($meta->conf['input_loop'])){$type=$meta->conf['input_loop'][0];$name=$meta->conf['input_loop'][1];}
			elseif(is_string($meta->conf['input_loop'])){$type=$meta->conf['input_loop'];$name='loop';}
			else{$type='list';$name='loop';}
			$class_name=\cp::get_class_name('content');
			if($q->have_posts()){
				while($q->have_posts()){
					ob_start();
					$class_name::from_object($post)->render($type,$name);
					if(isset($sortby)){$rtn[reset(\cp::get_output($sortby_meta,get_post_meta($post->ID,$sortby,true)))][ob_get_clean()]=$post->ID;}
					else{$rtn[ob_get_clean()]=$post->ID;}
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