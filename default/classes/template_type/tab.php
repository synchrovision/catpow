<?php
namespace Catpow\template_type;
/**
* 
*/

class tab extends template_type{
	public static function get_embeddables($path,$conf_data){
		return ['loop'=>['タブ'=>'loop.php']];
	}
	public static function get_template_files($conf_data){
		$path_data=\cp::parse_conf_data_path($conf_data['path']);
		return [
			'loop.php'=>[
				'',
				'@catpow',[
					'ul.tab.'.$path_data['data_name'],
					'<?php foreach(loop() as $obj): ?>',[
						'li[class="item<?=is_current_page()?\' active\':\'\'?>"]',
						['h3','@title'],
						'@link'
					],
					'<?php endforeach; ?>'
				]
			]
		];
	}
}

?>