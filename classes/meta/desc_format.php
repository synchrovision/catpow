<?php
namespace Catpow\meta;
use Catpow\util\seo;

class desc_format extends meta{
	public static $can_search=false;
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		return [get_option(self::get_option_name($data_type,$data_name,$conf))];
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		update_option(self::get_option_name($data_type,$data_name,$conf),reset($vals));
	}
	public static function get_option_name($data_type,$data_name,$conf){
		return seo::get_format_name('desc',"{$data_type}/{$data_name}/".($conf['template']??'single'));
	}
	
	public static function reflect_to_query(&$query,$data_type,$data_name,$meta_name,$id,$input,$conf){}
}
?>