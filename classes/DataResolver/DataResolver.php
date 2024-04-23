<?php
/**
* Resolve Server-Side-Render value in array recursive
*/
namespace Catpow\DataResolver;

class DataResolver{
	static public function resolve($data,$resolver=null){
		foreach($data as $key=>$item){
			if(is_array($item)){$data[$key]=self::resolve($item);}
		}
		$resolvers=isset($item['$resolver'])?(array)$item['$resolver']:[];
		if(isset($resolver)){$resolvers+=(array)$resolver;}
		foreach($resovers as $resolverName){
			$class="Catpow\\DataResolver\\".preg_replace('/\W/','',$resolverName);
			return $class::resolve($data);
		}
		return $data;
	}
}