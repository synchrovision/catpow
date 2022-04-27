<?php
namespace Catpow\data_type;

class nav extends post{
	public static function get_default_templates($conf){
		if(empty($conf['meta'])){return ['menu_item'];}
		return ['menu_item','admin'];
	}
}

?>