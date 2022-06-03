<?php
namespace Catpow\util;
class SerialFlags implements \IteratorAggregate, \ArrayAccess{
	protected $serial='';
	public function __construct($serial=''){
		if(empty($serial)){return;}
		if($serial[0]==='z'){
			$serial=substr($serial,1);
			$serial=preg_replace_callback('/g(\w)/',function($n){return str_repeat('0',hexdec($n[1]));},$serial);
			$serial=preg_replace_callback('/h(\w{2})/',function($n){return str_repeat('0',hexdec($n[1]));},$serial);
			$serial=preg_replace_callback('/i(\w+)j/',function($n){return str_repeat('0',hexdec($n[1]));},$serial);
		}
		$this->serial=$serial;
	}
	public function getIterator(){
		$c=0;
		foreach(array_reverse(str_split($this->serial,6)) as $chunk){
			$n=hexdec($chunk);
			for($j=0,$l=strlen($chunk)<<2;$j<$l;$j++){
				if($n&(1<<$j)){yield $c;}
				$c++;
			}
		}
	}
	public function offsetExists($offset):bool{
		$i=ceil(($offset+1)/4);
		if(strlen($this->serial)<$i){return false;}
		$n=hexdec($this->serial[-$i]);
		$m=1<<($offset%4);
		return !!($n&$m);
	}
	public function offsetGet($offset):mixed{
		return $this->offsetExists($offset);
	}
	public function offsetSet($offset,$value):void{
		$i=ceil(($offset+1)/4);
		if(strlen($this->serial)<$i){
			$this->serial=str_pad($this->serial,$i,'0',\STR_PAD_LEFT);
		}
		$n=hexdec($this->serial[-$i]);
		$m=1<<($offset%4);
		if(empty($value)){$n&=~ $m;}
		else{$n|=$m;}
		$this->serial[-$i]=dechex($n);
	}
	public function offsetUnset($offset):void{
		$this->offsetSet($offset,false);
	}
	
	public function __toString(){
		$serial=ltrim($this->serial,'0');
		if(strlen($serial)<100){return $serial;}
		return 'z'.preg_replace_callback(
			'/0{3,}/',
			function($n){
				$l=strlen($n[0]);
				if($l<0xf){return sprintf('g%x',$l);}
				if($l<0xff){return sprintf('h%02x',$l);}
				return sprintf('i%xj',$l);
			},
			$serial
		);
	}
}

?>