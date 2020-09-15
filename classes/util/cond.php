<?php
/**
* meta_queryの形式の配列を生成するためのクラス
* key value compare relationの連想配列を
* 特定のフォーマットに従った文字列から簡易に生成できる
* 
* eg:
* 
*/
namespace Catpow\util;
class cond{
	public static
		$cond_line_regex='/^(?P<key>\w+)\s*(?P<compare>(?:=|!=|>|>=|<|<=|LIKE|NOT LIKE|IN|NOT IN|BETWEEN|NOT BETWEEN|EXISTS|NOT EXISTS))\s*(?P<value>.*)$/';
	public $relation,$lines=[];
	public function __construct($data){
		if(is_string($data)){$data=explode("\n",$data);}
		foreach($data as $line){
			if($line==='[OR]'){$this->relation='OR';continue;}
			if($line=self::parse_line($line)){
				$this->lines[]=$line;
			}
		}
		if(empty($this->relation)){$this->relation='AND';}
	}
	public function test($inputs){
		$flag=$this->relation==='OR';
		foreach($this->lines as $line){
			if(empty($inputs[$line['key']]['value'])){
				if(in_array($line['compare'],['!=','NOT LIKE','NOT IN','NOT EXISTS'])===$flag){return $flag;}
			}
			else{
				if(self::test_values($line,$inputs[$line['key']]['value'])===$flag){return $flag;}
			}
		}
		return !$flag;
	}
	public static function parse_line($line){
		if(preg_match(self::$cond_line_regex,$line,$matches)){
			switch($matches['compare']){
				case 'IN':
				case 'NOT IN':
				case 'BETWEEN':
				case 'NOT BETWEEN':
					$matches['value']=explode(',',$matches['value']);
					break;
				case 'EXISTS':
				case 'NOT EXISTS':
					unset($matches['value']);
					break;
			}
			return array_intersect_key($matches,['key'=>0,'compare'=>0,'value'=>0]);
		}
		return false;
	}
	public static function test_values($line,$values){
		foreach($values as $value){
			if(self::test_value($line,$value)){return true;}
		}
		return false;
	}
	public static function test_value($line,$value){
		switch($line['compare']){
			case '=':return $value==$line['value'];
			case '!=':return $value!=$line['value'];
			case '>':return $value>$line['value'];
			case '>=':return $value>=$line['value'];
			case '<':return $value<$line['value'];
			case '<=':return $value<=$line['value'];
			case 'LIKE':return preg_match('/'.strtr($line['value'],['%'=>'.*','_'=>'.']).'/',$value);
			case 'NOT LIKE':return !preg_match('/'.strtr($line['value'],['%'=>'.*','_'=>'.']).'/',$value);
			case 'IN':return in_array($value,$line['value']);
			case 'NOT IN':return !in_array($value,$line['value']);
			case 'BETWEEN':return $value>=$line['value'][0] && $value<=$line['value'][1];
			case 'NOT BETWEEN':return $value<$line['value'][0] || $value>$line['value'][1];
			case 'EXISTS':isset($value);
			case 'NOT EXISTS':!isset($value);
			
		}
	}
}

?>