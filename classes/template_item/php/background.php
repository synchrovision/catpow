<?php
namespace Catpow\template_item\php;
/**
* 背景画像
*/

class background extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		if(isset($conf_data['meta']['background'])){
			if($param){return ['div.background',"<?php output('image',['size'=>'".$param[0]."']); ?>"];}
			return ['div.background',"<?php output('image'); ?>"];
		}
		if(isset($conf_data['meta']['image'])){
			if($param){return ['div.background',"<?php output('image',['size'=>'".$param[0]."']); ?>"];}
			return ['div.background',"<?php output('image'); ?>"];
		}
		return false;
	}
}

?>