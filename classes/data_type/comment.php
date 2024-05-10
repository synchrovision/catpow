<?php
namespace Catpow\data_type;

class comment extends data_type{
	public static $data_type='comment',$key_translation=['id'=>'comment_ID','parent'=>'comment_parent','name'=>'user_nicename','title'=>'comment_author','content'=>'comment_content'];
	public static function get_object($data_name,$data_id){
		return get_comment($data_id);
	}
	public static function get_default_templates($conf){
		if(empty($conf['meta'])){return ['comment'];}
		return ['comment','admin'];
	}
}

?>