<?php
namespace Catpow\data_type;

class term extends data_type{
	public static $data_type='term',$key_traslation=['id'=>'term_id','name'=>'slug','title'=>'name','content'=>'description'];
	public static function get_uri($term){
		$hierarchical_slugs = [];
		$ancestors=get_ancestors( $term->term_id, $term->taxonomy, 'taxonomy' );
		foreach ( (array) $ancestors as $ancestor ) {
			$ancestor_term =get_term( $ancestor, $term->taxonomy );
			$hierarchical_slugs[] = $ancestor_term->slug;
		}
		$hierarchical_slugs = array_reverse( $hierarchical_slugs );
		$hierarchical_slugs[] = $slug;
		return implode('/',$hierarchical_slugs);
	}
}

?>