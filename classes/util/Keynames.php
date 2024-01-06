<?php
/**
* 特別な意味を持ったカスタム投稿・固定ページ等の名称の管理
*/
namespace Catpow\util;
class Keynames{
	static $keynames=[
		'top'=>['top','home'],
		'about'=>['about','concept','feature','information','history'],
		'works'=>['products','works','gallery'],
		'member'=>['member','staff','creator'],
		'access'=>['access','shop','store'],
		'contact'=>['contact','inquiry'],
		'document'=>['tutrial','docs','document','reference','faq'],
		'main'=>['#top','#about','#works','#member','#faq','#access'],
		'primary'=>['#contact']
	],$cache=[];
	static function get($key){
		if(isset(self::$cache[$key])){return self::$cache[$key];}
		self::$cache[$key]=apply_filters("cp_keynames_{$key}",self::$keynames[$key]??[]);
		for($i=0,$l=count(self::$cache[$key]);$i<$l;$i++){
			$name=self::$cache[$key][$i];
			if($name[0]==='#'){
				$names=self::get(substr($name,1));
				array_splice(self::$cache[$key],$i,1,$names);
				$l+=count($names)-1;
				$i+=count($names)-1;
			}
		}
		array_unique(self::$cache[$key]);
		return self::$cache[$key];
	}
}

?>