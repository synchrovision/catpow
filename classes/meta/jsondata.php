<?php
namespace Catpow\meta;

class jsondata extends json{
	public static $has_children=true;
	
	public static function output($meta,$prm){
		return data::output($meta,$prm);
	}
	public static function input($meta,$prm){
		return data::input($meta,$prm);
	}
}
?>