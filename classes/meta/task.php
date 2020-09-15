<?php
namespace Catpow\meta;
use Catpow\content\task as taskContent;

class task extends data{
	
	public static function get($data_type,$data_name,$data_id,$meta_name,$conf){
		$task_ids=call_user_func(['\\Catpow\\data_type\\'.$data_type,'get_meta'],$data_name,$data_id,$meta_name);
		$rtn=[];
		foreach($task_ids as $task_id){
			if($param=taskContent::parse_task_id($task_id)){
				$task=new taskContent(compact($param));
				if($task->valid){$rtn[]=$task;}
			}
		}
		return $rtn;
	}
	public static function set($data_type,$data_name,$data_id,$meta_name,$vals,$conf){
		$tasks=array_column(static::get($data_type,$data_name,$data_id,$meta_name,$conf),null,'token_key');
		$new_vals=[];
		$new_task_ids=[];
		
		foreach($vals as $val){
			if(empty($key=$val['key'][0]) || !isset($tasks[$key])){$new_vals[]=$val;continue;}
			$tasks[$key]->param=array_merge($tasks[$key]->param,$val);
			$tasks[$key]->save();
			$new_task_ids[]=$task->get_task_id();
			unset($tasks[$key]);
		}
		foreach($tasks as $task){$task->delete();}
		
		foreach($new_vals as $new_val){
			$task=new taskContent(['param'=>$val]);
			$new_task_ids[]=$task->get_task_id();
		}
		meta::set($data_type,$data_name,$data_id,$meta_name,$new_task_ids,$conf);
	}
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		foreach($vals as $val){
			call_user_func(['\\Catpow\\data_type\\'.$data_type,'add_meta'],$data_name,$id,$meta_name,$val);
		}
	}
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){}
}
?>