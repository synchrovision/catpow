<?php
namespace Catpow\meta;

class select_options extends select{
	
	public static function get_selections($meta){
		if(isset($meta->conf['option'])){
			$rtn=(array)get_option($meta->conf['option']);
		}
		else{$rtn=[];}
		if(isset($meta->conf['addition'])){
			if(is_array($meta->conf['addition'])){$rtn=array_merge($rtn,$meta->conf['addition']);}
			else{$rtn[$meta->conf['addition']]=0;}
		}
		return $rtn;
	}
}
?>