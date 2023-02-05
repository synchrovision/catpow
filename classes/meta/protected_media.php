<?php
namespace Catpow\meta;
use Catpow\util\media_protect;

class protected_media extends media{
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		foreach($vals as $val){media_protect::protect($val);}
		parent::set($data_type,$data_name,$id,$meta_name,$vals,$conf);
	}
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		foreach($vals as $val){media_protect::protect($val);}
		parent::add($data_type,$data_name,$id,$meta_name,$vals,$conf);
	}
	public static function output($meta,$prm){
		if(self::should_allow($meta,$prm)){media_protect::allow($meta->value);}
		return parent::output($meta,$prm);
	}
	public static function input($meta,$prm){
		if(self::should_allow($meta,$prm)){media_protect::allow($meta->value);}
		return parent::input($meta,$prm);
	}
	public static function should_allow($meta,$prm){
		if(is_user_logged_in() && get_post($meta->value)->post_author == get_current_user_id()){return true;}
		if(!empty($meta->conf['capability']) && !current_user_can($meta->conf['capability'])){return false;}
		return true;
	}
}

?>