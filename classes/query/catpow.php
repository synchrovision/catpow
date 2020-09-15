<?php
namespace Catpow\query;
/**
* catpowの機能のクエリ
*/
class catpow extends query{
	public static
		$data_type='catpow',
		$data_type_name='catpow_type',
		$data_id_name='catpow_id',
		$query_class=false,
		$search_keys=[];
	public $results;
	
	public function __construct($q){
		$this->query($q);
	}
	public function query($q){
		//data_nameはfunctionsの一つ
		if(empty($q['data_name'])){$q['data_name']=$q['catpow_type']??'function';}
		$this->q=$q;
		if(isset($q['data_id'])){$this->results=$q['data_id'];return;}
		switch($q['data_name']){
			case 'function':
				$this->results=array_merge(\cp::$core_functions,\cp::$use_functions);
				//coreおよびfunctionsフォルダから全てのファイル名を抽出
				//テーマおよびCatpow拡張プラグインも対象
				break;
			default:
				//classes/$data_nameフォルダから全てのファイル名を抽出
				//テーマおよびCatpow拡張プラグインも対象
				$this->results=[];
				foreach(\cp::get_file_paths('classes/'.$q['data_name']) as $d){
					foreach(glob($d.'/*.php') as $f){
						$this->results[]=basename($f,'.php');
					}
				}
				break;
		}
	}
	
	public static function fill_query_vars($q){
		if(isset($q['data_name'])){$q['catpow_type']=$q['data_name'];}
		return $q;
	}
	
	public function is_empty(){return false;}
	public function count(){
		return 1;
	}
	public function loop(){
		$class_name=\cp::get_class_name('data_type','catpow');
		foreach($this->results as $result){
			yield $result=>new $class_name($this->data_name,$result);
		}
	}
	public static function manual_loop($functions){
		$class_name=\cp::get_class_name('data_type','catpow');
		foreach($functions as $function){
			yield $function=>new $class_name($this->data_name,$function);
		}
	}
	
}

?>