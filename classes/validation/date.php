<?php
namespace Catpow\validation;

class date extends validation{
	
	public static function is_valid(&$val,$conf,$input_id){
		$time=strtotime($val);
		if($time==false){return false;}
		$val=date('Y-m-d',$time);
		return true;
	}
	public static function get_message_format($conf){
		return __('日付として読み取れませんでした','catpow');
	}
}

?>