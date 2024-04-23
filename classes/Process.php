<?php
namespace Catpow;
/**
* Class used for process living through session.
* You should call process recursively until process file returns true, to complete process.
*/

class Process implements \IteratorAggregate{
	protected $pid,$tasks,$status,$pointer,$process,$process_type,$total,$is_completed;
	const PROCESS_TYPE_INVALID=0,PROCESS_TYPE_FILE=1,PROCESS_TYPE_CALLABLE=2;
	protected function __construct($process,$tasks){
		$this->pid=CP::rand_id();
		$this->process=$process;
		$this->tasks=$tasks;
		$this->total=count($this->tasks);
		if(is_string($process) && file_exists($process)){
			$this->process_type=self::PROCESS_TYPE_FILE;
		}
		elseif(is_callable($process,true) && (is_string($process) || is_string($process[0]))){
			$this->process_type=self::PROCESS_TYPE_CALLABLE;
		}
		else{
			$this->process_type=self::PROCESS_TYPE_INVALID;
		}
		$this->status=[
			'total'=>$this->total,
			'done'=>0,
			'task'=>null,
			'is_completed'=>false
		];
	}
	public function do_task(){
		$this->status['task']=$task=$this->tasks[$this->pointer]??null;
		if($this->process_type===self::PROCESS_TYPE_FILE){
			$process=$this;
			include $this->process;
		}
		elseif($this->process_type===self::PROCESS_TYPE_CALLABLE){
			call_user_func($this->process,$task);
		}
		$this->pointer++;
		$this->status['done']=$this->pointer;
		$this->status['is_completed']=$this->is_completed=$this->pointer>=$this->total;
		return $this->status;
	}
	public function __get($name){
		return $this->{$name};
	}
	public function getIterator(){
		return (function($process){
			while($process->do_task()['is_completed']!==true){yield $process->status;}
		})($this);
	}
	public static function create($process,$tasks){
		$instance=new static($process,$tasks);
		return CP::$data['process'][$instance->pid]=$instance;
	}
	public static function get($pid){
		return CP::$data['process'][$pid]??null;
	}
}