<?php
namespace Catpow\traits;

trait singleton{
	protected function __construct(){}
	static function get_instance(){
		if(!isset(static::$instance)){static::$instance=new static;}
		return static::$instance;
	}
	function __clone(){
		throw new RuntimeException('Cannot copy instance of '.get_called_class());
	}
}

?>