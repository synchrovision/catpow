<?php
namespace Catpow\template_type;
/**
* 
*/

class plain extends template_type{
	public static function get_template_files($conf_data){
		return [
			'loop.php'=>[
				'php',
				'namespace Catpow;',
				'foreach(loop() as $obj){the_content();}',
			]
		];
	}
}

?>