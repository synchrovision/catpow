<?php
namespace Catpow\meta;

class homepage extends meta{
	
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val)){return $val;}
		return sprintf('<a class="homepage" href="%1$s">%s</a>',$val);
	}
}
?>