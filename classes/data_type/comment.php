<?php
namespace Catpow\data_type;

class comment extends data_type{
	public static $data_type='comment';
	public static function get_default_templates($conf){
		if(empty($conf['meta'])){return ['comment'];}
		return ['comment','admin'];
	}
}

?>