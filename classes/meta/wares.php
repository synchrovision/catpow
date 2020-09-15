<?php
namespace Catpow\meta;
/**
* 商品の在庫・注文のデータ
* 以下の四つのデータベースで構成される
* wares		商品情報（カラー毎など在庫や注文時の区分毎に登録）
* stock		商品毎の在庫の情報
* ordered	商品毎の注文の情報
* orders	注文情報（orderedのグループ）
*/
class wares extends database{
	
	public static function fill_conf(&$conf){
		$default=['meta'=>[
			'name'=>['type'=>'text','label'=>__('品名','catpow')],
			'price'=>['type'=>'number','label'=>__('価格','catpow')],
			'stock'=>['type'=>'database','meta'=>[
				'amount'=>['type'=>'number','label'=>__('数量','catpow')],
				'expire'=>['type'=>'date','label'=>__('販売期限','catpow')],
				'place'=>['type'=>'select_rel_rows','label'=>__('保管場所','catpow'),'table'=>'stock_place'],
			]],
			'orders'=>['type'=>'orders','label'=>__('注文情報','catpow')],
			'stock_place'=>['type'=>'share','label'=>__('保管場所','catpow')]
		]];
		$conf=array_merge_recursive($conf,$default);
	}
	
	//補助
	public function get_table_path($path){
		return explode('/',$this->conf['path'].'/'.$path);
	}
	//注文
	public function order($param,$items){
		global $cpdb;
		$order_id=$cpdb->insert($this->get_table_path('ordered/orders'),$param);
		foreach($items as $item){
			$item['orders']=$order_id;
			$cpdb->insert($this->get_table_path('ordered'),$item);
		}
		
	}
	public function reserve($order_id,$pid,$amount,$place){}
	
	//領収
	public function accept($order_id){}
	//キャンセル
	public function cancel($order_id){}
	
	//発送
	public function send($order_id){}
	
	//補充
	public function supply($pid,$amount,$place,$limit){}
}
?>