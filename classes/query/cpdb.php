<?php
namespace Catpow\query;
/**
* cpdbのテーブルごとの情報を格納し操作するためのクラス
*/
class cpdb extends query{
	public static
		$data_type='cpdb',
		$data_type_name='table',
		$data_id_name='meta_id',
		$query_class=false,
		$united=true,
		$is_meta=true,
		$search_keys=['join'=>1,'orderby'=>1,'limit'=>0,'paged'=>0,'parent'=>1,'root_object'=>1],
		$q_default=['table'=>false,'where'=>false,'orderby'=>false,'join'=>false,'limit'=>false,'offset'=>false,'paged'=>false];
	public $table,$path,$columns,$rows,$where,$orderby,$join,$limit;
	
	public function __construct($q){
		$this->query($q);
	}
	
	public static function get($data_name,$data_id){
		global $cpdb;
		return $cpdb->select($data_name,['meta_id'=>$data_id])[$data_id]??null;
	}
	public static function set($data_name,$data_id,$object_data){
		global $cpdb;
		return $cpdb->update($data_name,[$data_id=>$object_data]);
	}
	public static function insert($object_data){
		global $cpdb;
		return $cpdb->insert($object_data['table'],$object_data);
	}
	public static function update($object_data){
		global $cpdb;
		$cpdb->update($object_data['table'],[$object_data['meta_id']=>$object_data]);
		return $object_data['meta_id'];
	}
	public static function delete($data_name,$data_id){
		global $cpdb;
		return $cpdb->delete($data_name,['meta_id'=>$data_id])[$data_id];
	}
	
	public static function fill_query_vars($q){
		if(isset($q['data_name'])){$q['table']=$q['data_name'];}
		if(isset($q['paged']) && $q['paged']>1 && isset($q['limit'])){$q['offset']=$q['limit']*($q['paged']-1);}
		if(isset($q['meta_query'])){
			foreach($q['meta_query'] as $meta_name=>$meta_query){
				$q['where'][$meta_query['key']][$meta_query['compare']]=$meta_query['value'];
			}
		}
		if(isset($q['parent'])){$q['where']['parent_id']=$q['parent'];}
		if(isset($q['root_object'])){$q['where']['root_object_id']=$q['root_object'];}
		if(isset($q['include'])){$q['where']['meta_id']=$q['include'];}
		return $q;
	}
	
	public function query($q){
		global $cpdb;
		$q=static::fill_query_vars($q);
		$q=array_merge(self::$q_default,array_intersect_key($q,self::$q_default));
		$this->q=$q;
		extract($q);
		$this->table=\cpdb::get_table_name($table);
		if(empty($cpdb->structure[$this->table])){return false;}
		$this->path=$cpdb->structure[$this->table]['path'];
		$this->columns=$cpdb->structure[$this->table]['columns'];
		$this->where=$where;
		$this->orderby=$orderby;
		$this->join=$join;
		$this->limit=$limit;
		if(!empty($offset)){$limit=$offset.','.$limit;}
		return $this->rows=$cpdb->select($table,$where,true,'*',$orderby,$join,$limit);
	}
	
	public function is_empty(){
		return empty($this->rows);
	}
	public function count(){
		return count($this->rows);
	}
	public function loop(){
		global $cpdb;
		$table=$this->table;
		$path=$this->path;
		
		$rows=$this->rows;
		$class_name=\cp::get_class_name('data_type','cpdb');
		foreach($rows??[] as $id=>$row){
			yield $id=>new $class_name($table,$row);
		}
	}
	public static function manual_loop($rows){
		$class_name=\cp::get_class_name('data_type','cpdb');
		foreach($rows as $row){
			yield $id=>new $class_name($table,$row);
		}
	}
	
	public function export(){
		$datas=[];
		$conf=\cp::get_conf_data($this->path);
		foreach($this->rows as $row){
			foreach($conf['meta'] as $meta_name=>$meta_conf){
				if(!isset($row[$meta_name])){continue;}
				$meta_class=\cp::get_class_name('meta',$meta_conf['type']);
				if(empty($meta_conf['multiple']) && !$meta_class::$is_bulk_input){$row[$meta_name]=reset($row[$meta_name]);}
			}
			$datas[]=array_merge(['data_type'=>'cpdb','table'=>$this->table],$row);
		}
		return $datas;
	}
	public static function import($datas){
		global $cpdb;
		foreach($datas as $row){
			$conf=\cp::$config['cpdb_datas'][$cpdb->structure[$row['table']]['alias']];
			foreach($conf['meta'] as $meta_name=>$meta_conf){
				if(!isset($row[$meta_name])){continue;}
				$meta_class=\cp::get_class_name('meta',$meta_conf['type']);
				if(empty($meta_conf['multiple']) && !$meta_class::$is_bulk_input){$row[$meta_name]=[$row[$meta_name]];}
			}
			if(empty($row['meta_id'])){static::insert($row);}
			else{static::update($row);}
		}
	}
	
	
	/*magic method*/
	public function __get($name){
		global $cpdb;
		if(isset(static::$key_translation[$name])){$name=static::$key_translation[$name];}
		switch($name){
			case 'total':
				return $this->total=$cpdb->count($this->table,$this->where);
			case 'max_num_pages':
				return $this->max_num_pages=$this->limit?ceil($this->total/$this->limit):1;
		}
		if(isset($this->q[$name])){
			return $this->q[$name];
		}
	}
	public function __set($name,$val){
		if(isset(static::$key_translation[$name])){$name=static::$key_translation[$name];}
	}
	public function __call($name,$args){
		if(isset($this->query)){
			return call_user_func_array([$this->query,$name],$args);
		}
	}
}
class_alias('Catpow\query\cpdb','cpdb_query');

?>