<?php
namespace Catpow\meta;

class SelectEmbedIcon extends UI{
	public static
		$output_type='select';
	static $ui='SelectPreparedImage',$defaultParam=['color'=>'currentColor'];
	public static function output($meta,$prm){
		$val=$meta->value;
		if(empty($val)){return $val;}
		return sprintf('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><use href="%s#root"/></svg>',$val);
	}
	public static function get_output_html_data($meta,$prm){
		$val=$meta->value;
		if(empty($val)){return null;}
		return [
			'svg',
			'class'=>$prm['class']??null,
			'viewBox'=>'0 0 20 20',
			['use','href'=>$val.'#root']
		];
	}
	public static function fill_param($prm,$meta){
		$prm=parent::fill_param($prm,$meta);
		$prm['type']='icon';
		$prm['valueKey']='url';
		return $prm;
	}
}
?>