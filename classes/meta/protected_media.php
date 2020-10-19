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
		do{
			if(!empty($meta->conf['capability']) && !current_user_can($meta->conf['capability'])){break;}
			media_protect::allow($meta->value);
		}while(false);
		return parent::output($meta,$prm);
	}
	public static function input($meta,$prm){
		do{
			if(!empty($meta->conf['capability']) && !current_user_can($meta->conf['capability'])){break;}
			media_protect::allow($meta->value);
		}while(false);
		return parent::input($meta,$prm);
	}
}

?>