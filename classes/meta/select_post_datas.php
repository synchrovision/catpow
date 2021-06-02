<?php
namespace Catpow\meta;

class select_post_datas extends select{
	
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val))return false;
		if(isset($meta->conf['addition'])){
			if(is_string($meta->conf['addition'])){$addition=[0=>$meta->conf['addition']];}
			else{$addition=array_flip($meta->conf['addition']);}
		}
		else{$addition=false;}
		if($post_data=\cp::get_post_data($val)){
			switch($prm){
				case 'content':
					return str_replace(']]>',']]&gt;',apply_filters('the_content',$post_data['post_content']));
				default:
					return '<span class="select_item">'.$post_data['post_title'].'</span>';
			}

		}
		elseif($addition){
			if(empty($val))$val=0;
			return array_key_exists($val,$addition)?$addition[$val]:reset($addition);
		}
	}
	
	public static function get_selections($meta){
		$rtn=select_rel_posts::get_selections($meta);
		$has_post=false;
		foreach($rtn as $key=>$val){
			if(is_numeric($val) && $val>0){
				$has_post=true;
				$rtn[$key]=get_post_type($val).'/'.get_page_uri($val);
			}
		}
		if(!$has_post){
			$rtn=[];
			$q=is_callable($meta->conf['value'])?$meta->conf['value']($meta):$meta->conf['value'];
			if(is_string($q)){$post_type=$q;}
			if(is_array($q)){$post_type=$q['post_type']??'post';}
			if(is_object($q) and is_a($q,\cp::get_class_name('query','post'))){
				$post_type=$q->query->query_vars['post_type'];
			}
			$conf_data=$GLOBALS['post_types'][$post_type];
			if(isset($conf_data['article_type'])){
				$class_name=\cp::get_class_name('article_type',$conf_data['article_type']);
				foreach($class_name::get_default_post_datas($conf_data) as $path=>$post_data){
					$rtn[$post_data['post_title']??$path]=$path;
				}
			}
			if(isset($conf_data['template'])){
				foreach($conf_data['template'] as $template){
					$class_name=\cp::get_class_name('template_type',explode('-',$template)[0]);
					foreach($class_name::get_default_post_datas($conf_data) as $path=>$post_data){
						$rtn[$post_data['post_title']??$path]=$path;
					}
				}
			}
			sort($rtn);
			if(isset($meta->conf['addition'])){
				if(is_array($meta->conf['addition'])){$rtn=array_merge($rtn,$meta->conf['addition']);}
				else{$rtn[$meta->conf['addition']]=0;}
			}
		}
		return $rtn;
	}
}
?>