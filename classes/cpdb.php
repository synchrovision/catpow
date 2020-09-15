<?php
namespace Catpow;

class cpdb{
	public static $cpdb;
	public $pdo,$last_insert_id,$host,$port,$dbname,$user,$structure,$functional,$tables,$alias,$relation;
	private function __construct(){
		if(strpos(\DB_HOST,':')){
			list($this->host,$this->port)=explode(':',\DB_HOST);
		}
		else{
			$this->host=\DB_HOST;
		}
		$this->dbname=\DB_NAME;
		$this->user=\DB_USER;
		$this->pdo = new \PDO(
			sprintf(
				'mysql:host=%s;%sdbname=%s;charset=utf8',
				$this->host,isset($this->port)?'port='.$this->port.';':'',
				\DB_NAME
			),
			\DB_USER,\DB_PASSWORD,
			array(
				\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
				\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
				\PDO::ATTR_EMULATE_PREPARES => false,
			)
		);
		$this->init();
	}
	public function init(){
		$table_datas=get_option('cpdb_tables');
		if(empty($table_datas)){return false;}
		$this->tables=array_keys($table_datas);
		$this->structure=$table_datas;
		$this->relation=[];
		$this->functional=[];
		foreach($table_datas as $table_name=>$table_data){
			$this->alias[$table_data['alias']]=$table_name;
			$this->relation[$table_name]=$table_data['children'];
			foreach($table_data['functions'] as $function){
				$this->functional[$function][$table_name]=$table_data;
			}
		}
	}
	
	public static function create_instance(){
		global $cpdb;
		if(!isset($cpdb)){$cpdb=new self();self::$cpdb=$cpdb;}
	}
	public static function get_table_name($name){
		global $wpdb;
		if(empty($name)){return null;}
		if(is_string($name)){
			$name=str_replace('/','_',$name);
			if(isset(self::$cpdb->alias[$name])){return self::$cpdb->alias[$name];}
			return $name;
		}
		if(is_array(end($name))){array_pop($name);}
		if(reset($name)==='cpdb'){
			array_shift($name);
			$table_name=self::get_table_name(array_shift($name));
			if(!empty($name)){$table_name.='_'.implode('_',$name);}
			return $table_name;
		}
		return $wpdb->prefix.'cpdb_'.implode('_',$name);
	}
	public static function get_alias_name($table){
		global $cpdb;
		$table_name=self::get_table_name($table);
		return $cpdb->structure[$table_name]['alias']??null;
	}

	/*helper*/
	public static function serialize_array($value){
		array_walk_recursive($value,function(&$v){$v=(string)$v;});
		return serialize($value);
	}
	public static function serialize_array_values($values){
		foreach($values as &$value){
			if(is_array($value)){$value=self::serialize_array($value);}
		}
		return $values;
	}
	
	/*[placeholder=>values]配列生成*/
	public static function get_sql_data_where($q,$sql=' WHERE '){
		if(is_numeric($q)){
			return [$sql.'parent_id = ?'=>[$q]];
		}
		if(empty($q)){
			return false;
		}
		if(is_array($q)){
			$phs=[];
			$vals=[];
			foreach($q as $key=>$val){
				if(is_array($val)){
					$vs=[];
					foreach($val as $k=>$v){
						if(is_string($k)){
							$k=strtoupper($k);
							if($k==='ALL' or $k==='ANY'){
								$v=(array)$v;
								$ph_tmp=[];
								foreach($v as $vv){
								   $vals[]=sprintf('%%%s%%',addcslashes(serialize((string)$vv),'\_%'));
								   $ph_tmp[]="`{$key}`".' LIKE ?';
								}
								$phs[]='('.implode(['ALL'=>' AND ','ANY'=>' OR '][$k],$ph_tmp).')';
								continue;
							}
							if($k==='BETWEEN'){
								$v=(array)$v;
								$ph_tmp=[];
								$vals[]=min($v);
								$vals[]=max($v);
								$phs[]="`{$key}` ".$k.' ? AND ?';
								continue;
							}
						}
						if(is_array($v)){
							if(is_string($k)){$compare=' '.$k.' ';}
							else{$compare=' IN ';}
							$vals=array_merge($vals,$v);
							$phs[]="`{$key}`".$compare.'(?'.str_repeat(',?',count($v)-1).')';
						}
						else{
							if(is_string($k)){$phs[]=$key.' '.$k.' ?';$vals[]=$v;}
							else{$vs[]=$v;}
						}
					}
					if(!empty($vs)){
						$vals=array_merge($vals,$vs);
						$phs[]="`{$key}`".' IN (?'.str_repeat(',?',count($vs)-1).')';
					}
				}
				elseif(is_numeric($key)){
					$phs[]=$val;
				}
				else{
					$vals[]=$val;
					$phs[]="`{$key}`".' = ?';
				}
			}
			return [$sql.implode(' AND ',$phs)=>$vals];
		}
	}
	public static function get_sql_data_values($values){
		if(empty($values)){return '() VALUES ()';}
		$values=self::serialize_array_values($values);
		return [' (`'.implode('`,`',array_keys($values)).'`) VALUES (?'.str_repeat(',?',count($values)-1).')'=>array_values($values)];
	}
	public static function get_sql_data_set($values){
		$values=self::serialize_array_values($values);
		return [' SET'.vsprintf(substr(str_repeat(' `%s` = ?,',count($values)),0,-1),array_keys($values))=>array_values($values)];
	}
	public static function get_sql_data_orderby($values){
		if(is_array($values)){$values=implode(',',$values);}
		return ' ORDER BY '.$values;
	}
	public static function get_sql_data_limit($values){
		if(is_array($values)){$values=implode(',',$values);}
		return ' LIMIT '.$values;
	}
	public static function get_sql_data_join($table,$name=false,$on=false){
		$table_name=self::get_table_name($table);
		if(empty($name)){
			if(is_array($table)){$path=$table;}
			else{$path=self::$cpdb->structure[$table_name]['path'];}
			$name=end($path);
		}
		if(empty($on)){$on=end($path).'.parent_id = '.prev($path).'.meta_id';}
		return ' LEFT JOIN '.$table_name.' AS '.$name.' ON '.$on;
	}
	public static function get_sql_data_from($table,$as=false){
		if(is_string($table)){return ' FROM '.$table.($as?' AS '.$as:'');}
		if(!is_array(end($table)) and is_numeric(key($table))){return ' FROM '.self::get_table_name($table).($as?' AS '.$as:'');}
		reset($table);
		$root_table=array_slice($table,0,count($table)-1);
		$sql=' FROM '.self::get_table_name($root_table).' AS '.end($root_table);
		$fnc_get_sql_data_join=function($table,$tree)use(&$fnc_get_sql_data_join){
			$rtn='';
			foreach((array)$tree as $key=>$val){
				if(is_numeric($key)){$name=$val;$child_tree=false;}
				else{$name=$key;$child_tree=$val;}
				$table[]=$name;
				$rtn.=self::get_sql_data_join($table);
				if($child_tree){$rtn.=$fnc_get_sql_data_join($table,$child_tree);}
				array_pop($table);
			}
			return $rtn;
		};
		$sql.=$fnc_get_sql_data_join($root_table,end($table));
		return $sql;
	}

	public function __get($name){
		if($name=='last_insert_id')return $this->last_insert_id;
		if($name=='tables'){return $this->tables;}
		if($name=='relation'){return $this->relation;}
		if($name=='structure'){return $this->structure;}
	}
	
	public function prepare($q){
		return $this->pdo->prepare($q);
	}
	public function query($qs){
		if(is_string($qs)){return $this->pdo->query($qs);}
		if(is_array($qs)){
			static $sths;
			$sql='';
			$vals=[];
			foreach($qs as $q){
				if(is_string($q)){$sql.=$q;}
				elseif(is_array($q)){
					foreach($q as $ph=>$vs){$sql.=$ph;$vals=array_merge($vals,$vs);}
				}
			}
			if(empty($sths[$sql])){$sths[$sql]=$this->prepare($sql);}
			$sths[$sql]->execute($vals);
			return $sths[$sql];
		}
	}
	
	public function insert($table,&$values){
		$table_name=self::get_table_name($table);
		if(empty($this->structure[$table_name])){return [];}
		$table_conf=$this->structure[$table_name];
		$cols=array_intersect_key($values,$table_conf['columns']);
		$children=array_keys(array_intersect_key($values,$table_conf['children']));
		
		if($table_conf['has_parent']){
			_a(isset($values['parent_id']),sprintf(__('%sへのinsertにparent_idは必須です','catpow'),$table_name));
			$cols['parent_id']=$values['parent_id'];
			if(isset($values['root_object_id'])){
				$root_object_id=$cols['root_object_id']=$values['root_object_id'];
			}
			else{
				if($table_conf['parent']){
					$parent_row=reset($this->select($table_conf['parent'],['meta_id'=>$cols['parent_id']],false));
					$root_object_id=$cols['root_object_id']=$parent_row['root_object_id'];
				}
				else{$root_object_id=$cols['root_object_id']=$cols['parent_id'];}
			}
		}
		foreach($cols as $key=>&$val){
			$col_conf=$table_conf['columns'][$key]??[];
			if(!empty($col_conf['multiple']) or !empty($col_conf['has_children'])){
				if(is_array($val)){array_walk_recursive($val,function(&$v){$v=(string)$v;});}
				$val=serialize((array)$val);
			}
			else{if(is_array($val)){$val=reset($val);}}
		}
		$this->query(['INSERT INTO '.$table_name,self::get_sql_data_values($cols)]);
		$id=$this->pdo->lastInsertId();
		if(!empty($children)){
			foreach($children as $child_name){
				foreach($values[$child_name] as &$child_values){
					if(!isset($child_values['root_object_id'])){$child_values['root_object_id']=$root_object_id;}
					if(!isset($child_values['parent_id'])){$child_values['parent_id']=$id;}
					$this->insert($table_conf['children'][$child_name],$child_values);
				}
			}
		}
		$values['meta_id']=$id;
		return $id;
	}
	public function update($table,$rows,$override=false,$override_children=false){
		$_table_name=self::get_table_name($table);
		if(empty($this->structure[$_table_name])){return [];}
		$updated_rows=[];
		$table_conf=$this->structure[$_table_name];
		foreach($rows as $id=>$row){
			$cols=array_intersect_key($row,$table_conf['columns']);
			$children=array_intersect_key($row,$table_conf['children']);
			
			foreach($cols as $key=>&$val){
				$col_conf=$table_conf['columns'][$key];
				if($col_conf['multiple'] or $col_conf['has_children']){
					if(is_array($val)){array_walk_recursive($val,function(&$v){$v=(string)$v;});}
					$val=serialize((array)$val);
				}
				else{if(is_array($val)){$val=reset($val);}}
			}
			
			if(isset($row['meta_id'])){
				$meta_id=$row['meta_id'];
				if($table_conf['has_parent']){
					$parent_id=$this->select($_table_name,['meta_id'=>$row['meta_id']],false,'parent_id');
					$parent_id=reset($parent_id)['parent_id'];
					$updated_rows[$parent_id][]=$meta_id;
				}
				$this->query(['UPDATE '.$_table_name,self::get_sql_data_set($cols),[' WHERE meta_id = ?'=>[$meta_id]]]);
			}
			else{
				if($table_conf['has_parent']){
					_a(isset($row['parent_id']),sprintf(__('%sへのinsertにparent_idは必須です','catpow'),$_table_name));
					$parent_id=$cols['parent_id']=$row['parent_id'];
					if(isset($row['root_object_id'])){$root_object_id=$cols['root_object_id']=$row['root_object_id'];}
					else{
						if($parent_table=$this->structure[$_table_name]['parent']){
							$parent_row=reset($this->select($parent_table,['meta_id'=>$cols['parent_id']],false));
							$root_object_id=$cols['root_object_id']=$parent_row['root_object_id'];
						}
						else{$root_object_id=$cols['root_object_id']=$cols['parent_id'];}
					}
				}
				$this->query(['INSERT INTO '.$_table_name,self::get_sql_data_values($cols)]);
				if($table_conf['has_parent']){
					$updated_rows[$parent_id][]=$meta_id=$this->pdo->lastInsertId();
				}
			}

			foreach($children as $child_name=>$child_rows){
				$child_table_conf=$this->structure[$table_conf['children'][$child_name]];
				if($child_table_conf['has_parent']){
					foreach($child_rows as &$child_row){
						if(isset($row['root_object_id'])){$child_row['root_object_id']=$row['root_object_id'];}
						$child_row['parent_id']=$meta_id;
					}
				}
				$this->update($table_conf['children'][$child_name],$child_rows,$override_children,$override_children);
			}
			if($override_children){
				foreach(array_diff_key($table_conf['children'],$children) as $child_name=>$child_table){
					$this->delete($child_table,['parent_id'=>$meta_id]);
				}
			}
		}
		if($override){
			foreach($updated_rows as $parent_id=>$meta_ids){
				$this->delete($_table_name,['parent_id'=>$parent_id,'meta_id'=>['NOT IN'=>$meta_ids]]);
			}
		}
	}
	public function select($table,$where=[],$include_children=true,$column='*',$orderby=false,$join=false,$limit=false){
		$table_name=self::get_table_name($table);
		if(empty($this->structure[$table_name])){return [];}
		$table_conf=$this->structure[$table_name];
		$path=$table_conf['path'];
		$cols=$table_conf['columns'];
		$rtn=[];
		if($join){$as=end($path);}
		else{$as=false;}
		if(is_array($column)){$column=implode(',',$column);}
		$include_meta_id=($column==='*' || strpos($column,'meta_id')!==false);
		if(!$include_meta_id){$column.=',meta_id';}
		$q=['SELECT '.$column,self::get_sql_data_from(is_array($table)?$table:$table_name,$as)];
		if($join){$q[]=self::get_sql_data_join($join);}
		if(is_numeric($where)){$where=['meta_id'=>$where];}
		elseif(is_array($where)){
			foreach($where as $key=>&$val){
				if(!empty($cols[$key]['multiple'])){
					$new=[];
					if(is_array($val)){
						foreach($val as $k=>$v){
							if(is_numeric($k)){$k='ANY';}
							if(is_array($v)){$new[$k]=array_merge((array)$new[$k],$v);}
							else{$new[$k][]=$v;}
						}
					}
					else{$new['ANY'][]=$val;}
					$val=$new;
				}
				unset($val);
			}
		}
		
		$q[]=self::get_sql_data_where($where);
		if($orderby){$q[]=self::get_sql_data_orderby($orderby);}
		if($limit){$q[]=self::get_sql_data_limit($limit);}
		$sth=$this->query($q);
		while($row=$sth->fetch(\PDO::FETCH_ASSOC)){
			foreach($row as $key=>&$val){
				if(in_array($key,['meta_id','root_object_id','parent_id']))continue;
				$col_conf=$this->structure[$table_name]['columns'][$key];
				if($col_conf['multiple'] or $col_conf['has_children']){$val=unserialize($val);}
				else{$val=(array)$val;}
			}
			unset($val);
			$meta_id=$row['meta_id'];
			if(!$include_meta_id){unset($row['meta_id']);}
			$rtn[$meta_id]=$row;
		}
		if($include_children){
			foreach($this->structure[$table_name]['children'] as $child_name=>$child_table_name){
				foreach($rtn as &$row){
					if($this->structure[$child_table_name]['has_parent']){
						$where=['parent_id'=>$row['meta_id']];
					}else{$where=[];}
					$row[$child_name]=$this->select($child_table_name,$where,true);
				}
				unset($row);
			}
		}
		return $rtn;
	}
	public function count($table,$where=[]){
		$table_name=self::get_table_name($table);
		if(empty($this->structure[$table_name])){return 0;}
		$table_conf=$this->structure[$table_name];
		$path=$table_conf['path'];
		$cols=$table_conf['columns'];
		$q=['SELECT COUNT(*) ',self::get_sql_data_from(is_array($table)?$table:$table_name)];
		if(is_numeric($where)){$where=['meta_id'=>$where];}
		elseif(is_array($where)){
			foreach($where as $key=>&$val){
				if(!empty($cols[$key]['multiple'])){
					$new=[];
					if(is_array($val)){
						foreach($val as $k=>$v){
							if(is_numeric($k)){$k='ANY';}
							if(is_array($v)){$new[$k]=array_merge((array)$new[$k],$v);}
							else{$new[$k][]=$v;}
						}
					}
					else{$new['ANY'][]=$val;}
					$val=$new;
				}
				unset($val);
			}
		}
		
		$q[]=self::get_sql_data_where($where);
		$sth=$this->query($q);
		return $sth->fetchColumn();
	}
	public function delete($table,$where,$include_children=true){
		$table_name=self::get_table_name($table);
		if(empty($this->structure[$table_name])){return [];}
		$table_conf=$this->structure[$table_name];
		$child_tables=$this->structure[$table_name]['children'];
		
		if(!empty($child_tables) and $include_children==true){
			foreach($this->select($table_name,$where) as $id=>$row){
				foreach($child_tables as $child_table_name){
					if($this->structure[$child_table_name]['has_parent']){
						$this->delete($$child_table_name,$row['meta_id']);
					}
				}
			}
		}
		$this->query(['DELETE FROM '.$table_name,self::get_sql_data_where($where)]);
	}
	public function truncate($table,$include_children=true){
		$table_name=self::get_table_name($table);
		if(empty($this->structure[$table_name])){return [];}
		$child_tables=$this->structure[$table_name]['children'];
		if(!empty($child_tables) and $include_children==true){
			foreach($child_tables as $child_table){
				$this->truncate($child_table);
			}
		}
		$this->query(['TRUNCATE TABLE '.$table_name]);
	}
}
cpdb::create_instance();
class_alias('Catpow\\cpdb','cpdb');

?>