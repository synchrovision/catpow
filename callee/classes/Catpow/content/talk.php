<?php
namespace Catpow\content;
class talk{
	public $progress;
	public function __get($name){return $this->$name;}
	
	public function append($cb,$arg){
		file_put_contents($this->f,json_encode(compact('cb','arg')).',',FILE_APPEND);
	}
	public function run(){
		include $this->res;
		while(true){
			if($res=file_get_contents($this->f,false,null,$this->progress)){
				echo '['.$res.']';
				$this->progress+=strlen($res);
				return;
			}
			sleep(1);
		}
	}
}