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
		$cond_line_regex='/^(?P<key>\w+)(?:\:(?P<type>\w+))?(?:\((?P<name>\w+)\))?\s*(?P<compare>(?:=|!=|>|>=|<|<=|LIKE|NOT LIKE|IN|NOT IN|BETWEEN|NOT BETWEEN|EXISTS|NOT EXISTS))\s*(?P<value>.*)$/',
		$orderby_line_regex='/^ORDERBY (?P<orderby>\w+)(?: (?P<order>ASC|DESC))?$/i',
		$limit_line_regex='/^LIMIT (?P<limit>\-?\d+)$/i';
	public $relation,$lines=[],$orderby,$limit;
	public function __construct($data){
		if(is_string($data)){$data=explode("\n",$data);}
		foreach($data as $line){
			if($line==='[OR]'){$this->relation='OR';continue;}
			if(preg_match(self::$orderby_line_regex,$line,$matches)){
				$this->orderby[$matches['orderby']]=$matches['order']??'ASC';continue;
			}
			if(preg_match(self::$limit_line_regex,$line,$matches)){$this->limit=$matches['limit'];continue;}
			if($line=self::parse_line($line)){
				if(empty($line['name'])){$this->lines[]=$line;}
				else{$this->lines[$line['name']]=$line;}
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
	public function test_content($content){
		$flag=$this->relation==='OR';
		foreach($this->lines as $line){
			$values=\cp::get_the_meta_value($content->the_data_path.'/'.$line['key']);
			if(empty($values)){
				if(in_array($line['compare'],['!=','NOT LIKE','NOT IN','NOT EXISTS'])===$flag){return $flag;}
			}
			else{
				if(self::test_values($line,$values)===$flag){return $flag;}
			}
		}
		return !$flag;
	}
	public function get_query($path){
		$rtn=['relation'=>$this->relation,'orderby'=>$this->orderby,'limit'=>$this->limit];
		$path_data=\cp::parse_content_path($path);
		
		$data_type=$path_data['data_type'];
		$data_name=$path_data['data_name'];
		$id=$path_data['data_id']??'s';
		
		$query_class_name=\cp::get_class_name('query',$data_type);
		
		$metas=\cp::get_the_conf_data($path)['meta'];
		foreach($this->lines as $line){
			$name=$line['key'];
			if(isset($metas[$name])){
				if(empty($line['name'])){unset($line['name']);}
				if(empty($line['type'])){unset($line['type']);}
				$line['value']=(array)$line['value'];
				$conf=$metas[$name];
				$class_name=\cp::get_class_name('meta',$conf['type']);
				if($class_name::$can_search){
					$class_name::reflect_to_query($rtn,$data_type,$data_name,$name,$id,$line,$conf);
				}
			}
			elseif(isset($query_class_name::$search_keys[$name])){
				if($query_class_name::$search_keys[$name]){$rtn[$name]=$line['value'];}
				else{$rtn[$name]=is_array($line['value'])?reset($line['value']):$line['value'];}
			}
		}
		return $rtn;
	}
	
	public static function parse_line($line){
		if(preg_match(self::$cond_line_regex,$line,$matches)){
			switch($matches['compare']){
				case 'BETWEEN':
				case 'NOT BETWEEN':
					$matches['value']=str_replace(['〜','~'],',',$matches['value']);
				case 'IN':
				case 'NOT IN':
					$matches['value']=explode(',',$matches['value']);
					break;
				case 'EXISTS':
				case 'NOT EXISTS':
					unset($matches['value']);
					break;
			}
			return array_intersect_key($matches,['key'=>0,'compare'=>0,'value'=>0,'name'=>0,'type'=>0]);
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
			case 'EXISTS':return isset($value);
			case 'NOT EXISTS':return !isset($value);
			
		}
	}
}

?>