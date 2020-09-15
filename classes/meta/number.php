<?php
namespace Catpow\meta;

class number extends meta{
	public static
		$value_type='NUMERIC',
		$data_type='FLOAT',
		$validation=['number'],
		$can_search_with_range=true;
	
	public static function output($meta,$prm){
		return number_format((float)$meta->value);
	}
}
?>