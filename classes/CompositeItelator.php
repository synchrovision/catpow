<meta charset="utf-8"/>
<?php
/*
組み合わせによる反復処理の支援クラス
・コンストラクタ
arg1	数値もしくは数値の配列
arg2	抽出数もしくは抽出最小数と最大数の配列
		arg1が配列の場合はそれぞれの抽出数の配列もしくは抽出最小数と最大数の二次配列
arg3	抽出数順か前方数値順か、抽出数順ならtrue、前方数値順ならfalse、初期値はfalse

■使い方
//ご飯１種類、おかず１〜２種類、汁物０〜３種類の組み合わせを出力
$arr2d=array(
	array('ごはん','パン','チャーハン','パスタ'),
	array('やき魚','南蛮焼き','ハンバーグ','ステーキ','しょうが焼き','トンカツ','唐揚げ'),
	array('みそ汁','コーンスープ','フカヒレスープ','茶碗蒸し')
);
$my_CI=new CompositeItelator($arr2d,array(1,array(1,2),array(0,3)),true);
$cnt=1;
do{
	echo('<p>'.chr(10));
	foreach($my_CI->result as $record){
		echo(implode(',',$record).'<br/>');
	}
	echo('</p>'.chr(10));
	$cnt++;
}while($my_CI->next());
*/


class CompositeItelator{
	public	$result,//各グループから抽出されたデータの二次配列
			$result_index,//各グループから抽出された番号の二次配列
			$count,//現在のループ処理数
			$limit;//強制的にfalseを返す限界処理数、初期値は10万
	private $num_arr,//抽出元の各グループの要素の数の配列
			$data_arr,//抽出元の各グループのデータ
			$span_arr,//各グループの抽出個数の範囲を表す二次配列
			$by_length,//抽出個数順で抽出するか抽出番号順で抽出するか
			$level,//グループの数
			$len_arr,//現在の各グループの抽出個数
			$max_arr;//各グループ各要素の最大値
			
	function __construct($data,$span='auto',$by_length=false){
		$this->count=0;
		$this->limit=100000;
		$this->num_arr=array();
		$this->data_arr=array();
		foreach($data as $i=>$record){
			$this->num_arr[$i]=count($record);
			$this->data_arr[$i]=(array)$record;
		}
		$this->span_arr=array();
		if($span=='auto'){
			foreach($this->num_arr as $i=>$num){
				$this->span_arr[$i]=array(0,$num);
			}
		}else if(is_array($span)){
			foreach($this->num_arr as $i=>$num){
				if($span[$i]=='auto' or !isset($span[$i])){
					$this->span_arr[$i]=array(0,$num);
				}else if(is_array($span[$i])){
					$this->span_arr[$i]=array($span[$i][0],$span[$i][1]);
				}else{
					$this->span_arr[$i]=array($span[$i],$span[$i]);
				}
			}
		}else{
			$this->span_arr=array(array($span,$span));
			while(count($this->span_arr)<count($num))$this->span_arr[]=array($span,$span);
		}
		$this->level=count($this->num_arr);
		$this->crr_level=$this->level-1;
		$this->result_index=array();
		$this->by_length=$by_length;
		foreach($this->span_arr as $i=>$span){
			$this->len_arr[$i]=$span[0];
			$this->result_index[$i]=array();
			$this->max_arr[$i]=array();
			for($j=0;$j<$span[0];$j++){
				$this->result_index[$i][]=$j;
				$this->max_arr[$i][]=$this->num_arr[$i]-$span[0]+$j;
			}
			while(count($this->max_arr[$i])<$span[1])$this->max_arr[$i][]=$this->num_arr[$i]-1;
			$this->set_data($i);
		}
	}
	public function next(){
		if($this->count++>$this->limit)return false;
		if($this->by_length){
			return $this->next_by_length();
		}else{
			return $this->next_by_number();
		}
	}
	private function next_by_length(){
		$i=$this->level-1;
		//対象グループの抽出が最大値に達している限り対象グループを前に送る
		//全てのグループが最大値に達していた場合抽出数を増やし初期化する
		//全てのグループの抽出数が最大抽出数に達していた場合falseを返す
		while($this->len_arr[$i]==0||$this->result_index[$i][0]==$this->num_arr[$i]-$this->len_arr[$i]){
			$this->result_index[$i]=array();
			for($j=0;$j<$this->len_arr[$i];$j++){
				$this->result_index[$i][$j]=$j;
			}
			$this->set_data($i);
			if($i--<=0){
				$i=$this->level-1;
				while($this->len_arr[$i]==$this->span_arr[$i][1]){
					$this->len_arr[$i]=$this->span_arr[$i][0];
					if($i--<0)return false;
				}
				$this->len_arr[$i]++;
				for($i=0;$i<$this->level;$i++){
					$this->result_index[$i]=array();
					for($j=0;$j<$this->len_arr[$i];$j++){
						$this->result_index[$i][$j]=$j;
					}
					$this->set_data($i);
				}
				return $this->result;
			}
		}
		//末尾の番号をカウントアップ
		array_push($this->result_index[$i],array_pop($this->result_index[$i])+1);
		//末尾の番号が最大値を超えている限り末尾を削除し一つ前の番号を一つ進める
		$mgn=1;
		while(end($this->result_index[$i])>$this->num_arr[$i]-$mgn){
			array_pop($this->result_index[$i]);$mgn++;
			array_push($this->result_index[$i],array_pop($this->result_index[$i])+1);
		}
		//抽出数を割り込んでいる限り末尾の次の番号を追加
		while(count($this->result_index[$i])<$this->len_arr[$i]){
			$this->result_index[$i][]=end($this->result_index[$i])+1;
		}
		$this->set_data($i);
		return $this->result;
	}
	private function next_by_number(){
		$i=$this->level-1;
		start:
		//対象グループが最大抽出数に達していないなら末尾と同じ番号を追加、最終グループが０ならば-1を追加
		if(count($this->result_index[$i])<$this->span_arr[$i][1]){
			$this->result_index[$i][]=count($this->result_index[$i])?end($this->result_index[$i]):-1;
		}
		//末尾の番号をカウントアップ
		array_push($this->result_index[$i],array_pop($this->result_index[$i])+1);
		//末尾の番号が最大値を超えている限り末尾を削除し一つ前の番号を一つ進める
		while(end($this->result_index[$i])>($this->max_arr[$i][count($this->result_index[$i])-1])){
			array_pop($this->result_index[$i]);
			if(!isset($this->result_index[$i][0])){
				for($j=0;$j<$this->span_arr[$i][0];$j++){
					$this->result_index[$i][]=$j;
				}
				$this->set_data($i);
				if($i--<=0)return false;//前の対象グループが存在しなければfalseを返して打ち切り
				goto start;
			}
			array_push($this->result_index[$i],array_pop($this->result_index[$i])+1);
		}
		//最小抽出数を割り込んでいる限り末尾の次の番号を追加
		while(count($this->result_index[$i])<$this->span_arr[$i][0]){
			$this->result_index[$i][]=end($this->result_index[$i])+1;
		}
		$this->set_data($i);
		return $this->result;
	}
	private function set_data($i){
		$this->result[$i]=array();
		foreach($this->result_index[$i] as $j){
			$this->result[$i][]=$this->data_arr[$i][$j];
		}
	}
}
