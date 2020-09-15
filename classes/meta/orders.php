<?php
namespace Catpow\meta;
/**
* waresの子として利用される
*/
class orders extends share{
	
	public static function fill_conf(&$conf){
		$default=['meta'=>[
			'user'=>['type'=>'select_rel_users','label'=>__('購入者','catpow')],
			'price'=>['type'=>'number','label'=>__('金額','catpow')],
			'payment_type'=>['type'=>'select_json','label'=>__('支払い方法','catpow'),'value'=>'payment_type'],
			'phase'=>['type'=>'select_json','label'=>__('進捗','catpow'),'value'=>'shop_phase']
		],'alias'=>'orders','alias_template'=>['manage']];
		$conf=array_merge_recursive($conf,$default);
	}
}
?>