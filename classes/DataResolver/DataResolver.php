<?php
/**
* Resolve Server-Side-Render value in array recursive
*/
namespace Catpow\DataResolver;

class DataResolver{
	static public function resolve($data){
		foreach($data as $key=>$item){
			if(is_array($item)){$data[$key]=self::resolve($item);}
		}
		if(isset($item['$resolver'])){
			$class="Catpow\\DataResolver\\".preg_replace('/\W/','',$item['$resolver']);
			return $class::resolve($data);
		}
		return $data;
	}
}