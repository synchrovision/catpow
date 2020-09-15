<?php
namespace Catpow\meta;

class select_site_meta extends select{
	public static function get_selections($meta){
		if(empty($meta->conf['value'])){return [];}
		global $blog_id;
		$rtn=get_site_meta($blog_id,basename($meta->conf['value']));
		if(isset($meta->conf['addition'])){
			if(is_array($meta->conf['addition'])){$rtn=array_merge($rtn,$meta->conf['addition']);}
			else{$rtn[$meta->conf['addition']]=0;}
		}
		return $rtn;
	}
}
?>