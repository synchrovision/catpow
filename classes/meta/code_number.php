<?php
namespace Catpow\meta;

class code_number extends meta{
	public static
		$input_type='text',
		$validation=['number_length'];
	public static function fill_conf(&$conf){
		if(empty($conf['length'])){$conf['length']=4;}
		if(empty($conf['size'])){$conf['size']=$conf['length'];}
		if(empty($conf['maxlength'])){$conf['maxlength']=$conf['length'];}
	}
}
?>