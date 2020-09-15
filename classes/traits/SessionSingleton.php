<?php
namespace Catpow\traits;

trait SessionSingleton{
	public static $instance;
	
	protected function __construct(){}
	static function getInstance(){
		static::$instance=&\cp::$data[static::INSTANCE_NAME??static::class];
		if(isset(static::$instance) && is_a(static::$instance,static::class)){
			return static::$instance;
		}
		static::$instance=new self();
		return static::$instance;
	}
	function __clone(){
		throw new RuntimeException('Cannot copy instance of '.get_called_class());
	}
}

?>