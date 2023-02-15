<?php
/**
* wp-content/jsonのjsonファイルを制作・管理
*/
namespace Catpow\util;

class json{
	public static function get($path){
		$json=self::get_file_path($path);
		if(!file_exists($json)){return null;}
		return json_decode(file_get_contents($json));
	}
	public static function set($path,$data){
		$json=self::get_file_path($path);
		$dir=dirname($json);
		if(!is_dir($dir)){mkdir($dir,0755,true);}
		file_put_contents($json,json_encode($data,0700));
	}
	public static function remove($path){
		$json=self::get_file_path($path);
		unlink($json);
	}
	public static function get_file_path($path){
		$dir=WP_CONTENT_DIR.'/json/';
		if(is_multisite()){$dir.=get_current_blog_id().'/';}
		return $dir.$path;
	}
}

?>