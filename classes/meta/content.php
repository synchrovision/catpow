<?php
namespace Catpow\meta;

class content extends meta{
	public static
		$value_type='NUMERIC',
		$data_type='bigint(20)',
		$can_search=false;
		
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val))return false;
		return str_replace(']]>',']]&gt;',apply_filters('the_content',get_post($val)->post_content));
	}
	
	public static function input($meta,$prm){
		//値がなければ新規投稿
		//値があれば
	}
}
?>