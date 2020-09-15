<?php
namespace Catpow\query;

class nav extends post{
	public static function fill_query_vars($q){
		$q['post_type']='nav_menu_item';
		if(isset($q['data_name'])){
			$q['tax_query']=array(
				array(
					'taxonomy'=>'nav_menu',
					'field'=>'slug',
					'terms'=>$q['data_name']
				)
			);
		}
		return $q;
	}
	public static function realize_path_data($path_data){
		$path_data['data_type']='post';
		$path_data['data_name']='nav_menu_item';
		return $path_data;
	}
}

?>