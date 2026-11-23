<?php
namespace Catpow\meta;

class homepage extends meta{
	
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val)){return $val;}
		return sprintf('<a class="homepage" href="%1$s">%s</a>',$val);
	}
	public static function get_output_html_data($meta,$prm){
		$value=$meta->value;
		if(empty($value)){return null;}
		return ['a.homepage','class'=>$prm['class']??null,'href'=>$value,$value];
	}
}
?>