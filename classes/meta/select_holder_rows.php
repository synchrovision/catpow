<?php
namespace Catpow\meta;

/**
*　select_rel_rowsとget,setが違う以外はほぼ同じ
*/

class select_holder_rows extends select_rel_rows{
	public static
		$value_type='NUMERIC',
		$data_type='bigint(20)';
	
	public static function get($data_type,$data_name,$meta_name,$id,$conf){
		global $cpdb;
		$holder=$conf['holder'];
		$col_name=array_pop($holder);
		$table_name=\cpdb::get_table_name($holder);
		$rows=$cpdb->select($table_name,[$col_name=>$id],'meta_id');
		foreach($rows as $row){$rtn[]=$row['meta_id'];}
		return $rtn;
	}
	public static function set($data_type,$data_name,$meta_name,$id,$vals,$conf){
		global $cpdb;
		$holder=$conf['holder'];
		$col_name=array_pop($holder);
		$table_name=\cpdb::get_table_name($holder);
		$org_rows=self::get($data_type,$data_name,$meta_name,$id);
		$new_rows=array_diff($val,$org_rows);
		$del_rows=array_diff($org_rows,$val);
		
		$holder_conf=\cp::get_conf_data($conf['holder']);
		$holder_class=\cp::get_class_name('meta',$holder_conf['type']);
		if(!empty($holder_conf['multiple']) || $holder_class::$is_bulk_input){
			$new_rows_vals=$cpdb->select($table_name,['meta_id'=>$new_rows],false,$col_name);
			foreach($new_rows_vals as &$new_rows_val){
				$new_rows_val[$col_name]=array_merge($new_rows_val[$col_name],[$id]);
			}
			$del_rows_vals=$cpdb->select($table_name,['meta_id'=>$del_rows],false,$col_name);
			foreach($del_rows_vals as &$del_rows_val){
				$del_rows_val[$col_name]=array_diff($del_rows_val[$col_name],[$id]);
			}
			$cpdb->update($table_name,$new_rows_val+$del_rows_val);
		}
		else{
			$update_rows=[];
			foreach($new_rows as $new_row){$update_rows[$new_row]=[$col_name=>$id];}
			foreach($del_rows as $del_row){$update_rows[$del_row]=[$col_name=>null];}
			$cpdb->update($table_name,$update_rows);
		}
	}
	public static function add($data_type,$data_name,$meta_name,$id,$vals,$conf){
		global $cpdb;
		$holder=$conf['holder'];
		$col_name=array_pop($holder);
		$table_name=\cpdb::get_table_name($holder);
		$org_rows=self::get($data_type,$data_name,$meta_name,$id);
		$new_rows=array_diff($val,$org_rows);
		
		$holder_conf=\cp::get_conf_data($conf['holder']);
		$holder_class=\cp::get_class_name('meta',$holder_conf['type']);
		if(!empty($holder_conf['multiple']) || $holder_class::$is_bulk_input){
			$new_rows_vals=$cpdb->select($table_name,['meta_id'=>$new_rows],false,$col_name);
			foreach($new_rows_vals as &$new_rows_val){
				$new_rows_val[$col_name]=array_merge($new_rows_val[$col_name],[$id]);
			}
			$del_rows_vals=$cpdb->select($table_name,['meta_id'=>$del_rows],false,$col_name);
			$cpdb->update($table_name,$new_rows_val);
		}
		else{
			$update_rows=[];
			foreach($new_rows as $new_row){$update_rows[$new_row]=[$col_name=>$id];}
			$cpdb->update($table_name,$update_rows);
		}
	}
	
	public static function reflect_to_data(&$data,$data_type,$data_name,$meta_name,$id,$input,$conf){
		return false;
	}
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){
		return false;
	}
	
	public static function fill_conf(&$conf){
		$holder=$conf['holder'];
		$conf['holder_column']=array_pop($holder);
		$conf['table']=\cpdb::get_table_name($holder);
	}

}
?>