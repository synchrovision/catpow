<?php
namespace Catpow\meta;

class database extends data{
	public static
		$can_search=true,
		$is_database=true;
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		global $cpdb;
		if($data_type=='cpdb'){
			if(static::$has_parent){$where=['parent_id'=>$id];}else{$where=[];}
			return $cpdb->select($cpdb->structure[\cpdb::get_table_name($data_name)]['children'][$meta_name],$where);
		}
		if(static::$has_parent){$where=['parent_id'=>$id];}else{$where=[];}
		return $cpdb->select($conf['path'],$where);
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		global $cpdb;
		$org_vals=static::get($data_type,$data_name,$id,$meta_name,$conf);
		foreach($org_vals as $meta_id=>$org_val){
			if(isset($vals[$meta_id])){$vals[$meta_id]['meta_id']=$meta_id;}
		}
		if($data_type=='cpdb'){
			if(!static::$has_parent){foreach($vals as &$val){$val['parent_id']=$id;}}
			return $cpdb->update($cpdb->structure[\cpdb::get_table_name($data_name)]['children'][$meta_name],$vals);
		}
		if(static::$has_parent){foreach($vals as &$val){$val['root_object_id']=$val['parent_id']=$id;}}
		return $cpdb->update([$data_type,$data_name,$meta_name],$vals,true,true);
	}
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		global $cpdb;
		if($data_type=='cpdb'){
			foreach($vals as &$val){
				if(static::$has_parent){$val['parent_id']=$id;}
				$cpdb->insert($cpdb->structure[\cpdb::get_table_name($data_name)]['children'][$meta_name],$val);
			}
		}
		else{
			foreach($vals as &$val){
				if(static::$has_parent){$val['root_object_id']=$val['parent_id']=$id;}
				$cpdb->insert([$data_type,$data_name,$meta_name],$val,true);
			}
		}
	}
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		global $cpdb;
		$where=[];
		foreach(reset($input['value']) as $key=>$val){
			if(empty($val) || is_array($val) && empty(array_filter($val))){continue;}
			if(isset($input['compare'][$key])){$where[$key][$input['compare'][$key]]=$val;}
			else{$where[$key]=$val;}
		}
		if($data_type=='cpdb'){
			$rows=$cpdb->select($cpdb->structure[\cpdb::get_table_name($data_name)]['children'][$meta_name],$where);
		}
		else{
			$rows=$cpdb->select([$data_type,$data_name,$meta_name],$where);
		}
		if(empty($rows)){$query['include']=[-1];}
		else{$query['include']=array_unique(array_column($rows,'parent_id'));}
	}
}
?>