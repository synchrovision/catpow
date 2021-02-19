<?php
/**
* 簡易な連想配列を生成するためのクラス
*/
namespace Catpow\util;
class dict{
	public static
		$dict_line_regex='/^(?P<key>.+?)\s*=\s*(?P<value>.+)$/';
	public $data;
	public function __construct($data){
		if(is_string($data)){$data=self::parse($data);}
		$this->data=$data;
	}
	public static function parse($str){
		$data=[];
		$lines=explode("\n",$str);
		foreach($lines as $line){
			if(preg_match(self::$dict_line_regex,$line,$matches)){
				$data[$matches['key']]=$matches['value'];
			}
		}
		return $data;
	}
}

?>