<?php
namespace Catpow\meta;

class select_post_meta extends select{
	public static function get_selections($meta){
		if(empty($meta->conf['value'])){return [];}
		$post_data=\cp::get_post_data(dirname($meta->conf['value']));
		$meta_name=basename($meta->conf['value']);
		$rtn=$post_data['meta'][$meta_name]??[];
		if(isset($meta->conf['addition'])){
			if(is_array($meta->conf['addition'])){$rtn=array_merge($rtn,$meta->conf['addition']);}
			else{$rtn[$meta->conf['addition']]=0;}
		}
		return $rtn;
	}
}
?>