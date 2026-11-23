<?php
namespace Catpow\meta;

class tel extends meta{
	
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val)){return $val;}
		if($prm==='text'){return $val;}
		return sprintf('<a class="tel" href="tel:%s">%s</a>',preg_replace('/\D/','',$val),$val);
	}
	public static function get_output_html_data($meta,$prm){
		$value=$meta->value;
		if(empty($value)){return null;}
		if($prm==='text'){return $value;}
		return ['a.tel','class'=>$prm['class']??null,'href'=>'tel:'.preg_replace('/\D/','',$value),$value];
	}
	public static function resolve_conf($conf){
		if(empty($conf['role'])){$conf['role']='tel';}
		return $conf;
	}
}
?>