<?php
namespace Catpow\template_item\php;
/**
* 画像
*/

class meta_name extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		switch($param[0]){
			case 'select':
				foreach($conf_data['meta'] as $key=>$conf){
					if(preg_match('/^(select|radio)/i',$conf['type'])){return $key;}
				}
				return key($conf_data['meta']);
			default:
				return key($conf_data['meta']);
		}
	}
}

?>