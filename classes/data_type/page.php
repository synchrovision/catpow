<?php
namespace Catpow\data_type;

class page extends data_type{
	public static $data_type='post';
	public static function get_default_templates($conf){
		if(empty($conf['meta'])){return ['page'];}
		return ['single','admin'];
	}
}

?>