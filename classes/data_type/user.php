<?php
namespace Catpow\data_type;

class user extends data_type{
	public static $data_type='user';
	public static function get_default_templates($conf){
		if(empty($conf['meta'])){return ['me'];}
		return ['me','admin'];
	}
}

?>