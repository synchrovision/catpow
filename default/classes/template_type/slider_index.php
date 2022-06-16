<?php
namespace Catpow\template_type;
/**
* 
*/

class slider_index extends template_type{
	public static $permalinks=[];
	
	public static function get_embeddables($path,$conf_data){
		return [
			'loop'=>[
				'スライダー（インデックス）'=>'loop.php'
			]
		];
	}
	public static function get_template_files($conf_data){
		return [
			'loop.php'=>[
				'',
				'@catpow',
				slider::get_slider_block_code_data([
					'type'=>'index',
					'image'=>'@image thumbnail',
					'title'=>'@title',
					'text'=>'@desc',
					'link'=>in_array('single',$conf_data['template'])?'@link':null,
					'dots'=>true,
					'arrow'=>true,
					'loop'=>true,
					'autoplay'=>true,
					'flickable'=>true,
				])
			]
		];
	}
}

?>