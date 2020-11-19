<?php
namespace Catpow\data_type;

class page extends post{
	public static function get_default_templates($conf){
		if(empty($conf['meta'])){return ['page'];}
		return ['single','admin'];
	}
}

?>