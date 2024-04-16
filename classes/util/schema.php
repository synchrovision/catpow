<?php
/**
* schema.jsonの解析
*/
namespace Catpow\util;
class schema{
	protected $schema,$resolver,$file;
	public function __construct($schema,$resolver=null){
		if(is_string($schema)){
			if(substr($schema,-5)==='.json'){
				$f=\cp::get_file_path($schema);
				if(!empty($f)){
					$this->file=$f;
					$schema=file_get_contents($f);
				}
			}
			$schema=json_decode($schema,true);
		}
		if(isset($resolver)){
			$this->resolve('#',$resolver);
		}
		$this->schema=$schema;
	}
	protected function resolve($path='#',$resolver=null){
		$crr_schema=$this->get_item($path);
		if(is_null($crr_schema)){return;}
		if(isset($resolver)){
			$crr_schema=$resolver($crr_schema,$this);
		}
		if(isset($crr_schema['$ref'])){
			$merged=[];
			while(isset($crr_schema['$ref'])){
				$ref=$crr_schema['$ref'];
				unset($crr_schema['$ref']);
				if(isset($merged[$ref])){break;}
				$crr_schema=array_merge_recursive(
					$this->get_item($this->resolve_path($ref,$path)),
					$crr_schema
				);
				$merged[$ref]=true;
			}
			$this->set_item($path,$crr_schema);
		}
		foreach($crr_schema as $key=>$val){
			if(is_array($val)){
				$this->resolve($path.'/'.$key,$resolver);
			}
		}
	}
	public static function get_default_values_from_schema($schema,$callback=null){
		if(isset($schema['oneOf'])){
			$schema=array_merge_recursive($schema,$schema['oneOf'][0]);
		}
		if(isset($schema['anyOf'])){
			$schema=array_merge_recursive($schema,$schema['anyOf'][0]);
		}
		if(isset($schema['allOf'])){
			$schema=array_merge_recursive($schema,call_user_func_array('array_merge_recursive',$schema['allOf']));
		}
		$values=isset($callback)?$callback($schema):($schema['default']??null);
		$type=$values['type']??gettype($values);
		if(isset($schema['properties'])){
			if(is_null($values)){$values=[];}
			foreach($schema['properties'] as $key=>$sub_schema){
				$default_value=self::get_default_values_from_schema($sub_schema,$callback);
				if(isset($default_value)){$values[$key]=$default_value;}
			}
		}
		return $values;
	}
	public static function merge_schema($schema,$schema_to_merge){
		foreach($schema_to_merge as $key=>$val){
			if(is_array($val) && is_array($shcema[$key]??null)){
				$shcema[$key]=array_merge($shcema[$key],$val);
			}
			else{
				$shcema[$key]=$val;
			}
		}
		return $schema;
	}
	public static function resolve_path($path,$base_path){
		if(preg_match('/^#?\//',$path)){
			$path=preg_replace('/^#?\//','',$path);
		}
		else{
			$path=rtrim($base_path,'/').'/'.$path;
		}
	}
	public function get_item($path){
		$rtn=$this->schema;
		if(!empty($path)){
			$keys=explode('/',$path);
			foreach($keys as $key){
				if(!isset($rtn[$key])){return null;}
				$rtn=$rtn[$key];
			}
		}
		return $rtn;
	}
	public function set_item($path,$value){
		$tgt=&$this->schema;
		if(!empty($path)){
			$keys=explode('/',$path);
			foreach($keys as $key){
				if(!isset($rtn[$key])){$tgt[$key]=[];}
				$tgt=&$tgt[$key];
			}
		}
		$tgt=$value;
	}
	public function get_default_value($callback=null){
		return self::get_default_values_from_schema($this->schema,$callback);
	}
	public function get_json(){
		return json_encode($this->schema,0700);
	}
}

?>