<?php
/**
 * 簡略なクラス名でBemの命名規則に基づいた命名を行うためのクラス
 * *-- = Package
 * *-  = Block
 * -*  = SubBlock
 * *_  = Element
 * _*  = SubElemen
 * --* = Modifier
 */
namespace Catpow;

class Bem{
	protected $parent,$class,$stucks=['wp-block-catpow','wp-block-catpow','wp-block-catpow','wp-block-catpow'];
	public function __construct($class_name=null){
		if(isset($class_name)){$this->start($class_name);}
	}
	public function start($class_name){
		if(is_array($class_name)){
			$classes=[];
			foreach($class_name as $key=>$val){
				if(is_numeric($key)){$classes[]=$val;}
				elseif($val){$classes[]=$key;}
			}
		}
		else{
			$classes=explode(' ',$class_name);
		}
		list($package,$block,$element)=end($this->stucks);
		foreach($classes as $i=>$class){
			if(preg_match('/^((\-\-?|_)[a-z][\w\-]*|[a-z][\w\-]*?(\-\-?|_))$/',$class,$matches)){	
				if(isset($matches[3])){
					if($matches[3]==='--'){
						$classes[$i]=$package=$block=$element=substr($class,0,-2);
					}
					elseif($matches[3]==='-'){
						$classes[$i]=$block=$element=$package.'-'.substr($class,0,-1);
					}
					elseif($matches[3]==='_'){
						$classes[$i]=$element=$block.'__'.substr($class,0,-1);
					}
				}
				else{
					if($matches[2]==='-'){
						$classes[$i]=$block=$element=$block.$classes[$i];
					}
					elseif($matches[2]==='_'){
						$classes[$i]=$element=$element.($block===$element?'__':'-').substr($class,1);
					}
					elseif($matches[2]==='--'){
						$classes[$i]=$element.$class;
					}
				}
			}
		}
		$class_name=implode(' ',$classes);
		array_push($this->stucks,[$package,$block,$element,$class_name]);
		return $class_name;
	}
	public function end(){
		array_pop($this->stucks);
	}
	public function __get($name){
		switch($name){
			case "result":{
				return end(end($this->stucks));
			}
		}
	}
	public function __toString(){
		return end(end($this->stucks));
	}
}