<?php
namespace Catpow\validation;

class selection extends validation{
	public static function is_valid(&$val,$conf){
		$class_name=\cp::get_class_name('meta',$conf['type']);
		$sels=$class_name::get_selections($conf);
		foreach($sels as $sel){
			if(is_array($sel)){
				foreach($sel as $s){
					if($s==$val){return true;}
				}
			}
			else{if($sel==$val){return true;}}
		}
		return false;
	}
	public static function get_message_format($conf){
		return __('選択項目にない値です','catpow');
	}
}

?>