<?php
namespace Catpow\meta;

class email extends meta{
	public static
		$validation=['email'];
	public static function fill_conf(&$conf){
		$conf['size']=32;
	}
}
?>