<?php
namespace Catpow\template_type;
/**
* 
*/

class news extends template_type{
	public static function get_embeddables($conf_data){
		return ['loop'=>[__('ニュース','catpow')=>'loop.php']];
	}
	public static function get_template_files($conf_data){
		return [
			'loop.php'=>[
				'',
				'@catpow',[
					'ul.news',
					'<?php foreach(loop() as $obj): ?>',[
						'li.item',
						['h3','@title'],
						['p','@desc'],
						'@link'
					],
					'<?php endforeach; ?>'
				]
			]
		];
	}
}

?>