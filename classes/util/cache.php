<?php
namespace Catpow\util;
class cache{
	
	public static function get_closure_code($fnc){
		$ref=new ReflectionFunction($fnc);
		$lines=array_slice(file($ref->getFileName()),$ref->getStartLine()-1,$ref->getEndLine()-$ref->getStartLine()+1);
		$lines[0]=substr($lines[0],strrpos($lines[0],'function('));
		$cnt=0;
		$last_line=array_pop($lines);
		foreach($lines as $line){
			$cnt+=substr_count($line,'{')-substr_count($line,'}');
		}
		do{
			$n=strpos($last_line,'}',$n+1);
			$line=substr($last_line,0,$n+1);
		}while((substr_count($line,'{')-substr_count($line,'}')!==-$cnt) && $n!==false);
		$lines[]=$line;
		return $lines;
	}

}

?>