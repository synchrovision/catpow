<?php
namespace Catpow\query;

class page extends post{
	public static
		$data_name='page';
	public static function fill_query_vars($q){
		$q['post_type']='page';
		if(isset($q['data_name'])){$q['pagename']=$q['data_name'];}
		return $q;
	}
	public static function realize_path_data($path_data){
		$path_data['data_type']='post';
		$path_data['data_name']='page';
		return $path_data;
	}
}

?>