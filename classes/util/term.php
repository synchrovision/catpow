<?php
/**
* WordPressのカテゴリに関するメソッド
*/
namespace Catpow\util;
class term{
	public static function get_object_terms_by_level($object_ids,$taxonomies){
		$terms_by_level=[];
		$terms=wp_get_object_terms($object_ids,$taxonomies,['orderby'=>'count']);
		$terms_by_id=array_column($terms,null,'term_id');
		foreach($terms as $term){
			$level=0;
			$parent=$term->parent;
			while($parent!==0 && $parent_term=$terms_by_id[$parent]??get_term($parent)){
				$level++;
				$parent=$parent_term->parent;
			}
			$terms_by_level[$level][]=$term;
		}
		krsort($terms_by_level);
		return $terms_by_level;
	}
}

?>