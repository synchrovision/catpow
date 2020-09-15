<?php
namespace Catpow\query;

class post extends query{
	public static
		$data_type='post',
		$data_type_name='post_type',
		$query_class='WP_Query',
		$search_keys=[
			's'=>0,'p'=>0,
			'nopaging'=>0,'posts_per_page'=>0,'offset'=>0,'paged'=>0,'ignore_sticky_posts'=>0,
			'post_status'=>1,'post_name'=>0,
			'orderby'=>1,'order'=>1,'date_query'=>1,'meta_key'=>0,'meta_value'=>0,
			'category__in'=>1, 'category__not_in'=>1, 'category__and'=>1,
			'post__in'=>1, 'post__not_in'=>1, 'post_name__in'=>1,
			'tag__in'=>1, 'tag__not_in'=>1, 'tag__and'=>1,
			'tag_slug__in'=>1, 'tag_slug__and'=>1, 'post_parent__in'=>1,
			'post_parent__not_in'=>1,
			'author__in'=>1, 'author__not_in'=>1
		],
		$key_translation=[
			'limit'=>'posts_per_page',
		],
		$data_keys=[
			'post_type',
			'ID',
			'post_title',
			'post_content',
			'post_author',
			'post_status',
			'post_date',
			'post_parent',
			'menu_order'
		];
	
	public static function get($data_name,$data_id){
		return get_post($data_id);
	}
	public static function set($data_name,$data_id,$object_data){
		$object_data['post_type']=$data_name;
		$object_data['ID']=$data_id;
		return wp_update_post($object_data);
	}
	
	public static function insert($object_data){
		if(!empty($object_data['ID'])){
			$org_post=get_post($object_data['ID']);
			if(empty($org_post)){
				$object_data['import_id']=$object_data['ID'];
				unset($object_data['ID']);
			}
			else{
				if(empty(array_diff(array_keys($object_data),array_slice(static::$data_keys,0,2)))){
					return $org_post->ID;
				}
				$object_data=array_merge(array_intersect_key((array)$org_post,array_flip(static::$data_keys)),$object_data);
			}
		}
		else{
			$object_data=array_merge([
				'post_title'=>\cp::date(),
				'post_content'=>'',
				'post_status'=>'publish'
			],$object_data);
		}
		return wp_insert_post($object_data);
	}
	public static function update($object_data){
		return wp_update_post($object_data);
	}
	public static function delete($data_name,$data_id){
		return wp_delete_post($data_id,true);
	}
	
	public static function fill_query_vars($q){
		if(is_numeric($q)){$q=['p'=>$q];}
		if(isset($q['data_name'])){$q['post_type']=$q['data_name'];}
		if(isset($q['limit'])){
			if(empty($q['limit'])){$q['nopaging']=true;}
			else{$q['posts_per_page']=$q['limit'];}
		}
		if(isset($q['include'])){$q['post__in']=$q['include'];}
		return $q;
	}
	public static function get_the_url($object){return get_permalink($object);}
	
	public function is_empty(){
		return !$this->query->have_posts();
	}
	public function count(){
		return $this->query->found_posts;
	}
	public function loop(){
		$org_post=$GLOBALS['post'];
		if(isset($this->objects)){
			foreach($this->objects as $GLOBALS['post']){
				yield $GLOBALS['post']->ID=>$GLOBALS['post'];
			}
		}
		else{
			while($this->query->have_posts()){
				$this->query->the_post();
				yield $GLOBALS['post']->ID=>$GLOBALS['post'];
			}
		}
		$GLOBALS['post']=$org_post;
	}
	public static function manual_loop($posts){
		$org_post=$GLOBALS['post'];
		foreach($posts as $GLOBALS['post']){
			yield $GLOBALS['post']->ID=>$GLOBALS['post'];
		}
		$GLOBALS['post']=$org_post;
	}
}

?>