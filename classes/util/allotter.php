<?php
namespace Catpow\util;

class Allotter{
	/**
	*   $cells要素に対して$items要素を
	*   受入可能要素および許容値と負荷値に基づいて割り当てて返す
	*/
	public static function allot($cells,$items,$param=false){
		if($param){extract($param);}
		if(!isset($items_name)){$items_name='items';}
		if(!isset($cell_name)){$cell_name='cell';}
		if(!isset($caps)){$caps=['capacity'=>'weight'];}
		if(!isset($accepts)){$accepts=['accepts'=>'name'];}
		//すべての要素で受入不能な要素が存在しないか確認
		foreach($accepts as $a=>$n){
			$all_accepts=[];
			foreach($cells as $cell){$all_accepts=$array_merge($all_accepts,$cell[$a]);}
			foreach($items as $item){
				if(!in_array($item[$n],$all_accepts)){self::error('some item was not accepted by any',101);}
			}
		}
		//負荷値の合計が許容値の合計を超えていないか
		//すべての要素の許容値を超えた負荷値の要素が存在しないか確認
		foreach($caps as $c=>$w){
			$c_total=0;$w_total=0;
			$c_max=0;$w_max=0;
			foreach($cells as $cell){$c_total+=$cell[$c];$c_max=max($c_max,$cell[$c]);}
			foreach($items as $item){$w_total+=$item[$w];$w_max=max($w_max,$item[$w]);}
			if($c_total<$w_total){self::error('capacity total is less than weight total',201);}
			if($c_max<$w_max){self::error('max capacity is less than max weight',202);}
		}
		//一つのcellにしか割当可能でないitemについて割り当てを確定
	}
	public static function test($cell,$item,$accepts,$caps){
		foreach($accepts as $a=>$n){
			if(!in_array($item[$n],$cell[$a])){return false;}
		}
		foreach($caps as $c=>$w){
			if($item[$w]>$cell[$c]){return false;}
		}
		return true;
	}
	public static function allot_item(&$cell,&$item,$caps,$items_name='items'){
		$cell[$items_name][]=$item;
		foreach($caps as $c=>$w){$cell[$c]-=$item[$w];}
	}
	public static function error($message,$code=0){
		throw new AllotException($message,$code);
	}
}

class AllotException extends Exception{
	/*
	code:
	101:すべての要素で受入不能な要素が存在する
	201:負荷値の合計が許容値の合計を超えている
	202:すべての要素の許容値を超えた負荷値の要素が存在する
	301:許容値を超えない分割方法が存在しない
	401:受入可能かつ許容値を超えない組み合わせが存在しない
	*/
	public function __construct($message,$code=0,Exception $previous=null){
		parent::__construct($message, $code, $previous);
	}
}


?>