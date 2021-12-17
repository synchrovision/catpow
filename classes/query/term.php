<?php
namespace Catpow\query;

class term extends query{
	public static
		$data_type='term',
		$data_type_name='taxonomy',
		$data_id_name='term_id',
		$query_class='WP_Term_Query',
		$search_keys=[],
		$key_translation=[
			'limit'=>'number',
		],
		$data_keys=[
			'taxonomy',
			'term_id',
			'name',
			'slug',
			'term_group',
			'description',
			'parent'
		];
	
	
	public static function get($data_name,$data_id){
		return get_term($data_id,$data_name);
	}
	public static function set($data_name,$data_id,$object_data){
		return wp_update_term($data_id,$data_name,$object_data)['term_id'];
	}
	public static function insert($object_data){
		global $wpdb;
		$object_data=array_merge([
			'name'=>\cp::date()
		],$object_data);
		if(isset($object_data['term_id'])){
			$new_term_id=$object_data['term_id'];
			if(term_exists($new_term_id)){
				$org_tax=$wpdb->get_var($wpdb->prepare("SELECT taxonomy FROM {$wpdb->term_taxonomy} WHERE term_id = %s",[$new_term_id]));
				if($org_tax===$object_data['taxonomy']){
					$updated_term=wp_update_term($object_data['term_id'],$object_data['taxonomy'],$object_data);
					if(is_wp_error($updated_term)){return false;}
					return $new_term_id;
				}
				wp_delete_term($new_term_id,$org_tax);
			}
			$created_term=wp_insert_term($object_data['name'],$object_data['taxonomy'],$object_data);
			if(is_wp_error($created_term)){return;}
			$created_term_id=$created_term['term_id'];
			$wpdb->update(
				$wpdb->terms,
				['term_id'=>$new_term_id],
				['term_id'=>$created_term_id]
			);
			$wpdb->update(
				$wpdb->term_taxonomy,
				['term_id'=>$new_term_id,'term_taxonomy_id'=>$new_term_id],
				['term_id'=>$created_term_id]
			);
			return $new_term_id;
		}
		return wp_insert_term($object_data['name'],$object_data['taxonomy'],$object_data)['term_id'];
	}
	public static function update($object_data){
		return wp_update_term($object_data['term_id'],$object_data['taxonomy'],$object_data)['term_id'];
	}
	public static function delete($data_name,$data_id){
		return wp_delete_term($data_id,$data_name);
	}
	
	public static function fill_query_vars($q){
		if(is_numeric($q)){$q=['term_taxonomy_id'=>$q];}
		if(isset($q['data_name'])){$q['taxonomy']=$q['data_name'];}
		if(isset($q['limit'])){
			if(empty($q['limit'])){$q['hide_empty']=false;}
			else{$q['number']=$q['limit'];}
		}
		if(isset($q['paged'])){
			$q['offset']=$q['number']*$q['paged'];
		}
		return $q;
	}
	public static function get_the_url($object){return get_term_link($object);}
	
	public function is_empty(){
		return empty($this->query->get_terms());
	}
	public function count(){
		return count($this->query->terms);
	}
	public function loop(){
		foreach($this->query->get_terms() as $term){
			yield $term->term_id=>$term;
		}
	}
	public static function manual_loop($terms){
		foreach($terms as $term){
			yield $term->term_id=>$term;
		}
	}
}

?>