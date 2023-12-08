<?php
namespace Catpow\data_type;

class post extends data_type{
	public static $data_type='post',$key_translation=['id'=>'ID','parent'=>'post_parent','name'=>'post_name','title'=>'post_title','content'=>'post_content'];
	public static function get_uri($obj){
		return get_page_uri($obj);
	}
}
?>