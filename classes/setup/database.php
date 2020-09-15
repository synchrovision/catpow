<?php
namespace Catpow\setup;

class database implements iSetup{
	static function exec(){
		
		global $wpdb,$cpdb;
		require_once( ABSPATH.'wp-admin/includes/upgrade.php');

		$org_tables=$cpdb->tables;

		$created_tables=[];
		$update_logs=[];
		$table_data=[];

		$fnc_update_cpdb_table=function($conf)use(&$fnc_update_cpdb_table,&$created_tables,&$update_logs,&$table_data,$org_tables){
			global $wpdb,$cpdb;
			$rtn=[];
			$class_name=\cp::get_class_name('meta',$conf['type']);
			if(!$class_name::$is_database){return $rtn;}

			$name=explode('/',$conf['path']);

			$unique_key='meta_id';

			$table_name=\cpdb::get_table_name($name);
			if(!isset($table_data[$table_name])){
				$table_data[$table_name]=[
					'path'=>$name,
					'columns'=>[],
					'children'=>[],
					'parent'=>(($cnt=count($name))>3)?\cpdb::get_table_name(array_slice($name,0,$cnt-1)):false
				];
			}

			$table_data[$table_name]['type']=$conf['type'];
			$table_data[$table_name]['path']=$conf['path'];
			$table_data[$table_name]['has_parent']=$class_name::$has_parent;
			$table_data[$table_name]['functions']=$class_name::$functions;
			$table_data[$table_name]['alias']=$conf['alias']??str_replace('/','_',$conf['path']);


			$cols=[];
			foreach($conf['meta'] as $col_name=>$col_data){
				$col_class_name=\cp::get_class_name('meta',$col_data['type']);
				if($col_class_name::$is_database){
					$rtn=array_merge($rtn,$fnc_update_cpdb_table($col_data));
					$table_data[$table_name]['children'][$col_name]=\cpdb::get_table_name(array_merge($name,[$col_name]));
					continue;
				}
				$multiple=(!empty($col_data['multiple']) or $col_class_name::$is_bulk_input);
				$has_children=$col_class_name::$has_children;
				$cols[$col_name]=['type'=>$col_data['type'],'multiple'=>$multiple,'has_children'=>$has_children];
				if(isset($col_class_name::$data_type) and !$multiple){
					$cols[$col_name]['data_type']=strtolower($col_class_name::$data_type);
				}
				else{$cols[$col_name]['data_type']='longtext';}
				if(isset($col_data['default'])){
					$default=$col_data['default'];
					if(is_array($default)){$default=serialize($default);}
					if(is_string($default)){$default=sprintf('"%s"',$default);}
					$cols[$col_name]['default']=$default;
				}
			}
			$table_data[$table_name]['columns']=$cols;
			if(in_array($table_name,$org_tables) and $cpdb->query("SHOW TABLES LIKE '{$table_name}'")->fetch(\PDO::FETCH_NUM)){
				$org_cols=[];

				foreach($cpdb->query('SHOW COLUMNS FROM '.$table_name) as $org_col_data){
					$org_col_name=$org_col_data[0];
					if(in_array($org_col_name,['meta_id','root_object_id','parent_id']))continue;
					$org_cols[$org_col_name]=['data_type'=>$org_col_data[1]];
					if(!is_null($org_col_data[4]))$org_cols[$org_col_name]['default']=$org_col_data[4];
				}
				$new_cols=array_diff_key($cols,$org_cols);
				$com_cols=array_intersect_key($cols,$org_cols);
				$del_cols=array_diff_key($org_cols,$cols);
				foreach($new_cols as $new_col_name=>$new_col){
					$sql="ALTER TABLE {$table_name} ADD `{$new_col_name}` {$new_col['data_type']}";
					if(isset($new_col['default']))$sql.=' DEFAULT '.$new_col['default'];
					$sql.=';';
					$cpdb->query($sql);
					$update_logs[$table_name][]='create column '.$new_col_name;
				}
				foreach($com_cols as $com_col_name=>$com_col){
					if(empty($com_cols['data_type']) || $com_cols['data_type']==$org_cols['data_type'])continue;
					$cpdb->query("ALTER TABLE {$table_name} MODIFY `{$com_col_name}` {$com_cols['data_type']};");
					$update_logs[$table_name][]='modify column '.$com_col_name.
						' from '.$org_cols['data_type'].
						' to '.$com_cols['data_type'];
				}
				foreach($del_cols as $del_col_name=>$del_col){
					$cpdb->query("ALTER TABLE {$table_name} DROP `{$del_col_name}`;");
					$update_logs[$table_name][]='delete column '.$del_col_name;
				}
			}
			else{
				$sql="CREATE TABLE IF NOT EXISTS {$table_name}(\n";
				$sql.="{$unique_key} bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,\n";
				if($class_name::$has_parent){
					$sql.="root_object_id longtext,\n";
					$sql.="parent_id longtext,\n";
				}
				foreach($cols as $col_name=>$col_data){
					$sql.="`{$col_name}` {$col_data['data_type']}";
					if(isset($col_data['default'])){$sql.=' DEFAULT '.$default;}
					$sql.=",\n";
				}
				$sql.="UNIQUE KEY {$unique_key} ({$unique_key})\n";
				$sql.=') '.$wpdb->get_charset_collate().';';
				$cpdb->query($sql);
				$created_tables[]=$table_name;
			}
			$rtn[]=$table_name;
			return $rtn;
		};
		$new_tables=[];
		\cp::conf_data_walk(function($data_type,$data_name,$conf_data)use($fnc_update_cpdb_table,&$new_tables){
			if(empty($conf_data['meta']))return;
			foreach($conf_data['meta'] as $meta_name=>$conf){
				$new_tables=array_merge($new_tables,$fnc_update_cpdb_table($conf));
			}
		});

		$deleted_tables=array_diff($org_tables,$new_tables);
		printf('created: %d tables<br/><br/>',count($created_tables));
		if(!empty($created_tables)){
			echo('　');
			echo implode('<br/>　',$created_tables).'<br/><br/>';
		}
		printf('updated: %d tables<br/><br/>',count($update_logs));
		if(!empty($update_logs)){
			foreach($update_logs as $table_name=>$update_log){
				echo '　'.$table_name.':<br/>　　';
				echo implode('<br/>　　',$update_log).'<br/><br/>';
			}
		}
		printf('deleted: %d tables<br/><br/>',count($deleted_tables));
		if(!empty($deleted_tables)){
			echo('　');
			$cpdb->query('DROP TABLE IF EXISTS '.implode(',',$deleted_tables).';');
			echo implode('<br/>　',$deleted_tables).'<br/><br/>';
		}
		update_option('cpdb_tables',$table_data);

	}
}