<?php
namespace Catpow\query;
/**
* オリジナルのdata_typeとWPの各種のクエリに共通のインターフェースを提供するクラス
*/

abstract class query{
	public static
		$data_type,
		$data_name=null,
		$data_type_name,
		$data_id_name='ID',
		$query_class,
		$united=false,
		$is_meta=false,
		$search_keys=[],
		$key_translation=[],
		$data_keys=[];
	public $q,$query,$objects,$base_path;
	
	public function __construct($q){
		if(is_object($q)){
			_a(get_class($q)===static::$query_class,'Query object of '.static::class.' must be '.static::$query_class);
			$this->q=$q->query_vars;
			$this->query=$q;
		}
		else{
			$this->q=static::fill_query_vars($q);
			$this->query=new static::$query_class($this->q);
		}
	}
	public static function create($q){
		if(is_object($q)){
			switch(get_class($q)){
				case 'WP_query':$data_type='post';break;
				case 'WP_user_query':$data_type='user';break;
				case 'WP_term_query':$data_type='term';break;
				case 'WP_comment_query':$data_type='comment';break;
			}
			$class_name=\cp::get_class_name('query',$data_type);
		}
		else{
			$class_name=\cp::get_class_name('query',$q['data_type']);
		}
		return new $class_name($q);
	}
	public static function from_request($request,$data_name,$id='s'){
		return new static(\cp::extract_query($request,static::$data_type.'/'.$data_name.'/'.$id));
	}
	
	public static function is_available_id($maybe_id){
		return (is_numeric($maybe_id) && $maybe_id>0);
	}
	
	public static function get($data_name,$data_id){}
	public static function set($data_name,$data_id,$object_data){}
	public static function insert($object_data){}
	public static function update($object_data){}
	public static function delete($data_name,$data_id){}
	
	public static function fill_query_vars($q){return $q;}
	public static function fill_object_data($object_data,$path_data){
		if(empty($path_data)){return $object_data;}
		if(empty($object_data[static::$data_type_name])){
			$object_data[static::$data_type_name]=static::$data_name??$path_data['data_name'];
		}
		if(static::is_available_id($path_data['data_id'])){
			$object_data[static::$data_id_name]=$path_data['data_id'];
		}
		return $object_data;
	}
	public static function realize_path_data($path_data){return $path_data;}
	public static function get_the_url($object){return false;}
	
	abstract public function is_empty();
	abstract public function count();
	abstract public function loop();
	
	
	public function export(){
		$datas=[];
		$name_key=static::$data_keys[0];
		$tmp=array_flip(static::$data_keys);
		$data_type=substr(static::class,strrpos(static::class,'\\')+1);
		$conf_data_name=\cp::get_conf_data_name($data_type);
		foreach($this->loop() as $id=>$obj){
			if(is_object($obj)){
				$object_data=[];
				foreach(static::$data_keys as $key){
					$object_data[$key]=$obj->$key;
				}
			}
			else{$object_data=array_replace($tmp,array_intersect_key($obj,$tmp));}
			$data_name=$object_data[$name_key];
			$conf=$GLOBALS[$conf_data_name][$object_data[$name_key]];
			$meta_data=[];
			if(!empty($conf['meta'])){
				foreach($conf['meta'] as $meta_name=>$meta_conf){
					$meta_class=\cp::get_class_name('meta',$meta_conf['type']);
					$val=$meta_class::export($data_type,$data_name,$id,$meta_name,$meta_conf);
					if(empty($meta_conf['multiple']) && !$meta_class::$is_bulk_input && is_array($val)){$val=reset($val);}
					$meta_data[$meta_name]=$val;
				}
			}
			$datas[]=array_merge(['data_type'=>$data_type],$object_data,$meta_data);
		}
		return $datas;
	}
	public static function import($datas){
		$inserted_ids=[];
		$name_key=static::$data_keys[0];
		$primary_key=static::$data_keys[1];
		$tmp=array_flip(static::$data_keys);
		$data_type=substr(static::class,strrpos(static::class,'\\')+1);
		$conf_data_name=\cp::get_conf_data_name($data_type);
		foreach($datas as $data){
			$object_data=array_intersect_key($data,$tmp);
			$data_name=$object_data[$name_key];
			$conf=$GLOBALS[$conf_data_name][$object_data[$name_key]];
			$id=static::insert($data);
			$inserted_ids[]=$id;
			if(!empty($conf['meta'])){
				foreach($conf['meta'] as $meta_name=>$meta_conf){
					if(isset($data[$meta_name])){
						$val=$data[$meta_name];
						$meta_class=\cp::get_class_name('meta',$meta_conf['type']);
						if(empty($meta_conf['multiple']) && !$meta_class::$is_bulk_input){$val=[$val];}
						$meta_class::import($data_type,$data_name,$id,$meta_name,$val,$meta_conf);
					}
				}
			}
		}
		return $inserted_ids;
	}
	
	/*magic method*/
	public function __get($name){
		if(isset(static::$key_translation[$name])){$name=static::$key_translation[$name];}
		if(isset($this->query)){
			return $this->query->$name;
		}
	}
	public function __set($name,$val){
		if(isset(static::$key_translation[$name])){$name=static::$key_translation[$name];}
		if(isset($this->query)){
			$this->query->$name=$val;
		}
	}
	public function __call($name,$args){
		if(isset($this->query)){
			return call_user_func_array([$this->query,$name],$args);
		}
	}
}

?>