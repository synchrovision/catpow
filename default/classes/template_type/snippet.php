<?php
namespace Catpow\template_type;
/**
* 
*/

class snippet extends template_type{
	public static function get_embeddables($conf_data){
		return ['snippet'=>['スニペット'=>'loop.php']];
	}
	public static function get_template_files($conf_data){
		$path_data=\cp::parse_conf_data_path($conf_data['path']);
		return [
			'loop.php'=>[
				'',
				[
					'php',
					'namespace Catpow;'
				],
				['div.snippet']
			],
		];
	}
}

?>