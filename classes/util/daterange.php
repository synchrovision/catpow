<?php
/**
* ２つの日時の長さなどを算出するためのクラス
* 
*/
namespace Catpow\util;
class daterange{
	const SECONDS_OF_DAY=86400;
	protected $fromTime,$toTime,$from,$to;
	public function __construct($from,$to){
		$this->fromTime=strtotime($from);
		$this->toTime=strtotime($to);
		$this->from=explode('-',date('Y-m-d',$this->fromTime));
		$this->to=explode('-',date('Y-m-d',$this->toTime));
	}
	public static function create($from,$to){
		return new self($from,$to);
	}
	public function getYear(){
		$rtn=$this->to[0]-$this->from[0];
		if($this->from[1].$this->from[2] > $this->to[1].$this->to[2]){$rtn--;}
		return $rtn;
	}
	public function getMonth(){
		$rtn=$this->getYear()*12+$this->to[1]-$this->from[1];
		if($this->from[2] > $this->to[2]){$rtn--;}
		return $rtn;
	}
	public function getDay(){
		return ceil(($this->toTime-$this->fromTime)/self::SECONDS_OF_DAY);
	}
}

?>