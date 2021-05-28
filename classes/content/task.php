<?php
namespace Catpow\content;

/**
* 別接続からの入力を受け取るためのフォーム
* 入力値やパラーメータをファイルとして保持し
* トークンによってそれを共有する
* checked=接続に対する処理許可 limitを消費する
* complete=タスク完了フラグ
* flag=フラグ
*/
class task extends form{
	public $valid,$token,$token_key,$f,$param;
	
	public function __construct($param){
		parent::__construct($param);
		if(isset($this->token)){
			$this->f=$this->get_dir().$this->token.'.php';
			$this->load();
		}
		else{
			$this->create();
		}
		if($this->parent && !is_null($this->parent->form)){
			if(isset($this->parent->form->tasks[$this->form_id])){
				$this->parent->form->tasks[$this->form_id]->delete();
			}
			$this->parent->form->tasks[$this->form_id]=$this;
			$this->inputs=$this->parent->form->inputs;
		}
	}
	
	public function get_dir(){
		return WP_CONTENT_DIR.'/task/'.get_current_blog_id().'/'.substr($this->file_path,0,-4).'/';
	}
	public function get_url(){
		$id=$this->get_task_id();
		$url=home_url(substr($id,strpos($id,'/')));
		return $url;
	}
	public function get_task_id(){
		$id=$this->path.'/'.$this->token.'-'.$this->token_key;
		if(!is_null($this->file_slug)){$id.='/'.$this->file_slug;}
		return $id;
	}
	public static function parse_task_id($id){
		if(preg_match('/([\w_\-\/]+)\/([0-9a-f]{16})\-([0-9a-f]{16})(\/(\w+))?\/?/',$id,$matches)){
			$file_path=$matches[1].'/task';
			if(!empty($matches[5])){$file_path.='-'.$matches[5];}
			$file_path.='.php';
			$path_data=\cp::parse_content_file_path($file_path);
			if(empty($path_data)){return false;}
			return [
				'path_data'=>$path_data,
				'token'=>$matches[2],
				'token_key'=>$matches[3],
			];
		}
		return false;
	}
	
	
	public function create(){
		$param=$this->param;
		if(!isset($param['expire'])){$param['expire']=strtotime('+ 1 hour');}
		if(!isset($param['limit'])){$param['limit']=1;}
		if(!isset($param['checked'])){$param['checked']=[];}
		if(!isset($param['flag'])){$param['flag']=[];}
		if(!isset($param['complete'])){$param['complete']=false;}
		if(!isset($param['inputs_data'])){$param['inputs_data']=[];}
		if(!isset($param['key'])){$param['key']=\cp::rand_id(8);}
		if($this->parent && !is_null($this->parent->form->loop_id)){
			$this->loop_id=$param['loop_id']=$this->parent->form->loop_id;
		}
		$dir=$this->get_dir();
		do{$token=\cp::rand_id(8);$f=$dir.$token.'.php';}
		while(file_exists($f));
		if(!is_dir(dirname($f))){mkdir(dirname($f),0755,true);}
		$str="<?php\n\$param=".var_export($param,true).';';
		file_put_contents($f,$str);
		$this->f=$f;
		$this->valid=true;
		$this->token=$token;
		$this->token_key=$param['key'];
		$this->param=$param;
	}
	public function delete(){
		unlink($this->f);
	}
	public function save(){
		if(!$this->valid){return $this;}
		$this->param['inputs_data']=$this->inputs->data;
		if(isset($this->inherit)){
			foreach(array_keys($this->inherit) as $key){
				$this->param['inherit_data'][$key]=$this->$key;
			}
		}
		$str="<?php\n\$param=".var_export($this->param,true).';';
		file_put_contents($this->f,$str);
		return $this;
	}
	public function load(){
		if(!file_exists($this->f)){$this->valid=false;return $this;}
		include $this->f;
		if($this->token_key!==$param['key']){$this->valid=false;return $this;}
		if($param['expire'] < time() && $param['limit'] < 1){$this->valid=false;return $this;}
		$this->valid=true;
		$this->param=$param;
		$this->inputs->data=$this->param['inputs_data'];
		$this->loop_id=$this->param['loop_id']??'p';
		if(isset($param['inherit_data'])){
			foreach($param['inherit_data'] as $key=>$val){
				$this->$key=$val;
				$this->inherit[$key]=true;
			}
		}
		return $this;
	}
	
	public function check(){
		if($this->checked()){return true;}
		$this->load();
		if(!$this->valid){return false;}
		$this->param['checked'][\cp::$id]=true;
		$this->param['limit']--;
		$this->save();
		return true;
	}
	public function checked(){
		return isset($this->param['checked'][\cp::$id]);
	}
	
	public function complete(){
		$this->param['complete']=true;
		$this->save();
		return $this;
	}
	public function is_completed(){
		return !empty($this->param['complete']);
	}
	public function wait_complete(){
		while(true){
			if($this->load()->is_completed()){return true;}
			sleep(1);
		}
	}
	
	public function beacon($name='beacon',$flag=0){
		// $flag 1 = カウント 2 = 無制限
		$key=\cp::rand_id(8);
		$this->param['beacon'][$key]=[$name=>$flag];
		$this->save();
		printf(
			'<img src="%s" alt="" width="0" height="0"/>',
			plugins_url('catpow/callee/beacon.php').'?'.http_build_query([
				'path'=>get_current_blog_id().'/'.substr($this->file_path,0,-4).'/'.$this->token.'-'.$this->token_key,
				'key'=>$key
			])
		);
		return true;
	}
	
	public function flag($name,$val=null){
		if(isset($val)){
			if(empty($val)){unset($this->param['flag'][$name]);}
			else{$this->param['flag'][$name]=true;}
			return $this;
		}
		return isset($this->param['flag'][$name]);
	}
	public function wait_flag($name){
		while($this->valid){
			if($this->load()->flag($name)){return true;}
			sleep(1);
		}
		return false;
	}
}

?>