<?php
namespace Catpow;
/**
* ユーザー入力を保持するためのクラス
* data_pathまたはinput_idを用いて
* データを操作するメソッドを提供する
*/
class inputs extends \stdClass{
	public $name,$data;
	
	public function __construct($name,$data){
		$this->name=$name;
		$this->data=$data;
	}

	public function &ref($data_path,$key='value'){
		$sel=self::selector_from_path($data_path,$key);
		eval('$ref = &'.$sel.';');
		return $ref;
	}
	public function has($data_path,$key='value'){
		$sel=self::selector_from_path($data_path,$key);
		return eval('return isset('.$sel.');');
	}
	public function get($data_path,$key='value'){
		$sel=self::selector_from_path($data_path,$key);
		return eval('return '.$sel.'??null;');
	}
	public function set($data_path,$value,$key='value'){
		$sel=self::selector_from_path($data_path,$key);
		eval($sel.' = $value;');
	}
	public function del($data_path,$key='value'){
		$sel=self::selector_from_path($data_path,$key);
		eval('unset('.$sel.');');
	}
	public function def($data_path,$value,$key='value'){
		$sel=self::selector_from_path($data_path,$key);
		if(eval('return isset('.$sel.');')){return false;}
		eval($sel.' = $value;');
	}
	
	public function &ref_by_id($input_id){
		$sel=self::selector_from_id($input_id);
		eval('$ref = &'.$sel.';');
		return $ref;
	}
	public function has_by_id($input_id){
		$sel=self::selector_from_id($input_id);
		return eval('return isset('.$sel.');');
	}
	public function get_by_id($input_id){
		$sel=self::selector_from_id($input_id);
		return eval('return '.$sel.'??null;');
	}
	public function set_by_id($input_id,$value){
		$sel=self::selector_from_id($input_id);
		eval($sel.' = $value;');
	}
	public function del_by_id($input_id){
		$sel=self::selector_from_id($input_id);
		eval('unset('.$sel.');');
	}
	public function def_by_id($input_id,$value){
		$sel=self::selector_from_id($input_id);
		if(eval('return isset('.$sel.');')){return false;}
		eval($sel.' = $value;');
	}
	
	public function merge($inputs){
		foreach($inputs->data as $type=>$d){
			foreach($d as $name=>$dd){
				foreach($dd as $id=>$ddd){
					$this->data[$type][$name][$id]=array_merge($this->data[$type][$name][$id]?:[],$ddd);
				}
			}
		}
	}
	
	public static function selector_from_path($data_path,$key='value'){
		$path_arr=explode('/',self::sanitize_path($data_path));
		if(isset($path_arr[3])){array_splice($path_arr,4,0,$key);}
		return '$this->data["'.implode('"]["',$path_arr).'"]';
	}
	public static function selector_from_id($input_id){
		return '$this->data["'.str_replace(\cp::INPUT_ID_DELIMITER,'"]["',self::sanitize_path($input_id)).'"]';
	}
	public static function sanitize_path($path){
		return preg_replace('/[^\w\-\/]/','',$path);
	}
}

?>