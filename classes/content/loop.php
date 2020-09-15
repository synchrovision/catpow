<?php
namespace Catpow\content;

/**
* queryを元にloopを行う
* loop中はloop_idおよびobjectがセットされる
* 
*/
class loop extends content{
	public $query;
	
	/*loop*/
	public function loop(){
		if(\cp::$content!==$this){$org_content=\cp::$content;\cp::$content=$this;}
		if(isset($this->objects)){
			$query_class=\cp::get_class_name('query',$this->data_type);
			foreach($query_class::manual_loop($this->objects) as $this->loop_id=>$this->object){
				yield $this->loop_id=>$this->object;
			}
		}
		else{
			foreach($this->query->loop() as $this->loop_id=>$this->object){
				yield $this->loop_id=>$this->object;
			}
		}
		unset($this->loop_id,$this->object);
		if(isset($org_content)){\cp::$content=$org_content;}
	}
	public function collect($key,$prm=null,$sort=null){
		if(\cp::$content!==$this){$org_content=\cp::$content;\cp::$content=$this;}
		$data=[];
		foreach($this->query->loop() as $this->loop_id=>$this->object){
			if(is_string($key)){$k=$this->meta($key)->get_output($prm);}
			else{$k=$key($this->loop_id,$this->object);}
			$data[$k][$this->loop_id]=$this->object;
		}
		unset($this->loop_id,$this->object);
		$query_class=\cp::get_class_name('query',$this->path_data['data_type']);
		$gen=function($arr)use($query_class){
			foreach($query_class::manual_loop($arr) as $this->loop_id=>$this->object){
				yield $this->loop_id=>$this->object;
			}
			unset($this->loop_id,$this->object);
		};
		foreach($data as $k=>$arr){
			yield $k=>$gen($arr);
		}
		if(isset($org_content)){\cp::$content=$org_content;}
	}
	
}

?>