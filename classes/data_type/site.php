<?php
namespace Catpow\data_type;

class site extends data_type{
	public static
		$data_type='site',
		$default_template=[];
	public function __constuct(){}
	public static function get_object($data_name,$data_id){
		return get_site($data_id);
	}
}

?>