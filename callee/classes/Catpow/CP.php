<?php
namespace Catpow;
class CP{
	public static
		$cp,$id,$extensions,$data_types,$content,$content_path,$inputs,$forms,$form,$data,
		$core_functions=[
			'init',
			'basic',
			'image',
			'post','term','user','nav','comment','view',
			'template',
		],$use_functions;
	protected $stock;
	
	public function __get($name){return $this->$name;}
	public function __wakeup(){
		self::$id=&$this->stock['id'];
		self::$inputs=&$this->stock['inputs'];
		self::$forms=&$this->stock['forms'];
		self::$data=&$this->stock['data'];
	}
}
class_alias('Catpow\CP','cp');