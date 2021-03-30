<?php
namespace Catpow\meta;

class select_json extends select{
	public static function get_selections($meta){
		$f=\cp::get_file_path('json/'.($meta->conf['value']??$meta->conf['name']).'.json');
		if(empty($f)){return [];}
		$rtn=json_decode(file_get_contents($f),true);
		if(isset($meta->conf['addition'])){
			if(is_array($meta->conf['addition'])){$rtn=array_merge($rtn,$meta->conf['addition']);}
			else{$rtn[$meta->conf['addition']]=0;}
		}
		return $rtn;
	}
}
?>