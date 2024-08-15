<?php
namespace Catpow\template_type;
/**
* 
*/

class news extends template_type{
	public static function get_embeddables($path,$conf_data){
		return ['loop'=>[__('ニュース','catpow')=>'loop.php']];
	}
	public static function fill_conf_data(&$conf_data){
		if(empty($conf_data['taxonomies']['label'])){
			$conf_data['taxonomies']['label']=[
				'label'=>__('ラベル','catpow'),
				'meta'=>[
					'color'=>['label'=>__('色','catpow'),'type'=>'color']
				]
			];
		}
		if(empty($conf_data['meta']['label'])){
			$conf_data['meta']['label']=[
				'label'=>__('ラベル','catpow'),
				'type'=>'radio_terms',
				'value'=>'label',
				'show_in_loop'=>true
			];
		}
	}
}

?>