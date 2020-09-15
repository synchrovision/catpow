<?php
/**
* WordPressのmetaテーブルに関わるsql句を生成するためのクラス
* 
*/
namespace Catpow\util\sql;
class meta extends sql{
	public static function select_computed_value($type,$table,$keys,$compute,$where=null){
		$primary_alias=key($keys);
		$primary_key=array_shift($keys);
		if(is_numeric($primary_alias)){$primary_alias = $primary_key;}
		$sql="SELECT {$primary_alias}.{$type}_id,({$compute}) AS meta_value FROM {$table} AS {$primary_alias} ";
		foreach($keys as $alias=>$key){
			if(is_numeric($alias)){$alias = $key;}
			$sql.=
				"INNER JOIN {$table} AS {$alias} ".
				"ON {$primary_alias}.{$type}_id = {$alias}.{$type}_id ".
				"AND {$alias}.meta_key = '{$key}' ";
		}
		$sql.="WHERE {$primary_alias}.meta_key = '{$primary_key}'";
		if(isset($where)){$sql.=' AND '.$where;}
		return $sql;
	}
}

?>