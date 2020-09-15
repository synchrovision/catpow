<?php
namespace Catpow\template_type;
/**
* アンケート
*/

class exam extends template_type{
	public static function get_embeddables($conf_data){
		return ['form'=>['Q&A'=>'form.php']];
	}
	public static function get_template_files($conf_data){
		$form_post_type=$conf_data['data_name'];
		return[
			'form.php'=>[
				'php',
				'namespace Catpow;'
			],
			'sec.php'=>[
				'php',
				'namespace Catpow;'
			]
		];
	}
	
	public static function get_form_type($file){
		switch($file){
			case 'form.php':
				return 1;
			default:
				return parent::get_form_type($file);
		}
	}
}

?>