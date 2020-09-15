<?php
namespace Catpow;

class conf implements \ArrayAccess{
	public $data;
	public function __construct($data){
		$this->data=$data;
	}
	
	public function offsetSet($offset,$value){
		if(empty($offset) || is_numeric($offset)){return false;}
		$this->data[$offset] = $value;
	}

	public function offsetExists($offset){
		return isset($this->data[$offset]);
	}

	public function offsetUnset($offset){
		unset($this->data[$offset]);
	}

	public function offsetGet($offset){
		if(isset($this->data[$offset])){return $this->data[$offset];}
	}
	
	
}


?>