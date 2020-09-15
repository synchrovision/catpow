<?php
namespace Catpow\template_type;
/**
* 
*/

class menu extends template_type{
	public static function get_embeddables($conf_data){
		return ['loop'=>[__('メニュー','catpow')=>'loop.php']];
	}
	public static function get_template_files($conf_data){
		return [
			'loop.php'=>[
				'',
				'@catpow',
				'<?php foreach(loop() as $id=>$obj): ?>',
				'@icon',
				['h3','<?=$title?>',['small','@desc']],
				'<?php endforeach; ?>'
			],
		];
	}
}

?>