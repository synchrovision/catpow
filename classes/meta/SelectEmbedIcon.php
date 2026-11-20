<?php
namespace Catpow\meta;

class SelectEmbedIcon extends UI{
	public static
		$output_type='select';
	static $ui='SelectPreparedImage',$defaultParam=['color'=>'currentColor'];
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val) || !file_exists($val)){return $val;}
		if(!in_array(mime_content_type($val),['image/svg','image/svg+xml'],true)){return mime_content_type($val);}
		return sprintf('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><use href="%s#root"/></svg>');
	}
	public static function fill_param($prm,$meta){
		$prm=parent::fill_param($prm,$meta);
		$prm['type']='icon';
		$prm['valueKey']='url';
		return $prm;
	}
}
?>