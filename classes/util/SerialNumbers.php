<?php
namespace Catpow\util;
class SerialNumbers implements \IteratorAggregate, \ArrayAccess{
	protected $bucket=[];
	public function __construct($serial=''){
		$bucket=[];
		if(!empty($serial)){
			foreach(explode('z',$serial) as $chunks){
				foreach(str_split(substr($chunks,1),hexdec($chunks[0])) as $chunk){
					$this->bucket[base_convert($chunk,32,10)]=true;
				}
			}
		}
	}
	public function getIterator(){
		ksort($this->bucket);
		foreach(array_keys($this->bucket) as $n){yield $n;}
	}
	public function offsetExists($offset):bool{
		isset($this->bucket[$offset]);
	}
	public function offsetGet($offset):mixed{
		return $this->offsetExists($offset);
	}
	public function offsetSet($offset,$value):void{
		if(empty($value)){
			unset($this->bucket[$offset]);
		}
		else{
			$this->bucket[$offset]=true;
		}
	}
	public function offsetUnset($offset):void{
		$this->offsetSet($offset,false);
	}
	
	public function __toString(){
		$chunks=[];
		foreach(array_keys($this->bucket) as $n){
			$s=base_convert($n,10,32);$g=strlen($s);
			if(!isset($chunks[$g])){$chunks[$g]=$g;}
			$chunks[$g].=$s;
		}
		return implode('z',$chunks);
	}
}

?>