<?php
namespace Catpow\meta;
/**
* 現状この入力はoptionsなどと同様にツリー構造データの子要素としては使用できない
* 
*/
class encrypt_text extends text{
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		$vals=parent::get($data_type,$data_name,$id,$meta_name,$conf);
		foreach($vals as &$val){$val=\cp::decrypt($val);}
		return $vals;
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		foreach($vals as &$val){$val=\cp::encrypt($val);}
		parent::set($data_type,$data_name,$id,$meta_name,$vals,$conf);
	}
}
?>