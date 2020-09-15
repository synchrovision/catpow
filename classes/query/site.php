<?php
namespace Catpow\query;
/**
* サイトのクエリ
*/
class site extends query{
	public static
		$data_type='site',
		$data_type_name='site_type',
		$data_id_name='site_id',
		$query_class=false,
		$search_keys=[];
	
	public function __construct($q){}
	
	public static function fill_query_vars($q){
		if(isset($q['data_name'])){$q['site_type']=$q['data_name'];}
		return $q;
	}
	
	public function is_empty(){return false;}
	public function count(){
		return 1;
	}
	public function loop(){
		$class_name=\cp::get_class_name('data_type','site');
		yield new $class_name();
	}
	public static function manual_loop($sites){
		foreach($sites as $site){
			yield $site->ID=>$site;
		}
	}
	
}

?>