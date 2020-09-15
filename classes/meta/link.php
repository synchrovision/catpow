<?php
namespace Catpow\meta;

class link extends data{
	
	public static function output($meta,$prm){
		$val=$meta->value;
		return sprintf('<a class="link" href="%s">%s</a>',$val['url'][0],$val['text'][0]);
	}
	public static function fill_conf(&$conf){
		$default=['meta'=>[
			'text'=>['type'=>'text','label'=>__('テキスト','catpow')],
			'url'=>['type'=>'text','label'=>__('URL','catpow')],
		]];
		$conf=array_merge_recursive($conf,$default);
	}
}
?>