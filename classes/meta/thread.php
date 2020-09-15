<?php
namespace Catpow\meta;

/**
* 値としてはthread_idを持つ
* thread_id
*/
class thread extends meta{
	protected $info,$param,$group;
	
	/*handler*/
	public function __get($name){
		switch($name){
			case 'path':
				return $this->path=
					WP_CONTENT_DIR.'/thread/'.
					get_current_blog_id().'/'.
					$this->data_path.'/'.
					$this->data;
			case 'progress':
				return $this->param['progress'];
			case 'param':
				if(isset($this->param)){return $this->param;}
				$dir=$this->path.'/param';
				$f=$dir.'/'.cp::$id.'.php';
				if(file_exists($f)){include $f;}
				else{$param=[];}
				return $this->param=$param;
			case 'info':
				if(isset($this->info)){return $this->info;}
				$dir=$this->path;
				$f=$dir.'/info.php';
				if(file_exists($f)){include $f;}
				else{$info=[];}
				return $this->info=$info;
		}
	}
	public function __set($name,$val){
		switch($name){
			case 'progress':
				$param=$this->__get('param');
				$param['progress']=$val;
				return $this->__set('param',$param);
			case 'param':
				$dir=$this->path.'/param';
				$f=$dir.'/'.cp::$id.'.php';
				if(!file_exists($f)){dir_create($dir);}
				$str="<?php\n\$param=".var_export($val,true).';';
				file_put_contents($f,$str);
				return $this->param=$val;
			case 'info':
				$dir=$this->path;
				$f=$dir.'/info.php';
				if(!file_exists($f)){dir_create($dir);}
				$str="<?php\n\$info=".var_export($val,true).';';
				file_put_contents($f,$str);
				return $this->info=$val;
		}
	}
	
	public function ping(){
		
	}
	public function do_task(){
		try{
			$progress=$this->progress;
			if(file_exists($f=$this->path.'/task/'.$progress.'.php')){include $f;}
			else{return false;}
			return $this->progress=$progress+1;
		}
		catch(Exception $e){return false;}
	}
	
	
	/*static*/
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		if(!empty($thread_id=$GLOBALS['cp_thread_ids'][$data_type][$data_name][$id][$meta_name])){return $thread_id;}
		if(!empty($thread_id=cp::$data['cp_thread_ids'][$data_type][$data_name][$id][$meta_name])){return $thread_id;}
		if(empty($conf['value'])){return $id;}
		if(is_callable($conf['value'])){return $conf['value']($id);}
		switch($conf['value']){
			case 'session':return cp::$id;
			case 'user':return current_user_id();
			case 'role':return get_user_role();
			default:return $id;
		}
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		cp::$data['cp_thread_ids'][$data_type][$data_name][$id][$meta_name]=$vals;
	}
	
	public static function output($meta,$prm){}
	public static function input($meta,$prm){}
	
	public static function validate($input_id,$vals,$meta,&$errors){}
	public static function reflect_to_inputs(&$data,$input,$meta){}
	
	public static function reflect_to_data(&$data,$data_type,$data_name,$meta_name,$id,$input,$conf){}
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){}
 
}
?>