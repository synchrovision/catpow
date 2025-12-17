<?php
/**
* 日時が指定されたスケジュールに入っているかを判定するためのクラス
* 開始と終了の日時を指定するスケジュールと
* 日付・曜日・時刻により毎年・月・日繰り返すスケジュールの２種類があり
* これを組み合わせて指定することもできる
* 
* eg:
* 2020/3/1~4/4,7,8,5/1,3,5
* 10:00~13:00
* 
*/
namespace Catpow\util;
class schedule{
	const SECONDS_OF_DAY=86400;
	const DATETIME_PATTERN='/^(?:(?:(\d{4})\-)?(?:(\d{1,2})\-)?(\d{1,2}))?\b\s?(?:(\d{1,2}):(\d{2}))?$/';
	
	public $data=[];
	public function __construct($data){
		if(is_string($data)){$data=explode("\n",$data);}
		foreach($data as $line){
			$line_type=self::get_line_type($line);
			$this->data[$line_type]=self::{'parse_'.$line_type.'_line'}($line);
		}
	}
	public function includes($time='now'){
		if(is_string($time)){$time=strtotime($time);}
		foreach($this->data as $type=>$data){
			switch($type){
				case 'periods':
					foreach($data as $period){
						if($period[0]<=$time && $period[1]>=$time){continue 3;}
					}
					return false;
				case 'yearly':
					$month=wp_date('m',$time);
					$date=wp_date('m/d',$time);
					foreach($data as $value){
						if($value===$month || $value===$date){continue 3;}
					}
					return false;
				case 'monthly':
					$date=wp_date('d',$time);
					$nth_day=sprintf('%d-%d',ceil($date/7),wp_date('w',$time));
					foreach($data as $value){
						if($value===$date || $value===$nth_day){continue 3;}
					}
					return false;
				case 'weekly':
					$day=wp_date('w',$time);
					foreach($data as $value){
						if($value===$day){continue 3;}
					}
					return false;
				case 'daily':
					$hour=wp_date('H:i',$time);
					foreach($data as $period){
						if($period[0]<=$hour && $period[1]>=$hour){continue 3;}
					}
					return false;
			}
		}
		return true;
	}
	public static function get_line_type($line){
		$line=self::normalize_line_text($line);
		if(preg_match('/\d{4}[\/-]\d/',$line)){return 'periods';}
		if(preg_match('/\d\/\d/',$line)){return 'yearly';}
		if(preg_match('/第\d[月火水木金土日]/',$line)){return 'monthly';}
		if(preg_match('/^([,~]?(\d+日?))+~?$/',$line)){return 'monthly';}
		if(preg_match('/\d+月/',$line)){return 'yearly';}
		if(preg_match('/(jan|feb|mar|apr|may|jun|jul|aug|oct|sep|nov|dec)/',$line)){return 'yearly';}
		if(preg_match('/[月火水木金土日]/',$line)){return 'weekly';}
		if(preg_match('/(sun|mon|tue|wed|thu|fri|sat)/',$line)){return 'weekly';}
		if(preg_match('/\d[:：]\d{2}/',$line)){return 'daily';}
		if(preg_match('/\d+/',$line)){return 'monthly';}
		return 'invalid';
	}
	
	public static function parse_periods_line($line){
		$periods=[];
		$line=self::normalize_line_text($line);
		$line=str_replace('/','-',$line);
		foreach(explode(',',$line) as $item){
			if(strpos($item,'~')!==false){
				$values=array_map('trim',explode('~',$item));
				if(empty($values[0])){
					$periods[]=[
						0,
						self::normalize_date_value($values[1]),
					];
				}
				elseif(empty($values[1])){
					$periods[]=[
						self::normalize_date_value($values[0]),
						INF
					];
				}
				else{
					$periods[]=[
						self::normalize_date_value($values[0]),
						self::normalize_date_value($values[1])
					];	
				}
			}
			else{
				$time=self::normalize_date_value(trim($item));
				$periods[]=[$time,$time+self::SECONDS_OF_DAY];
			}
		}
		return $periods;
	}
	public static function parse_yearly_line($line){
		$dates=[];
		$line=self::normalize_line_text($line);
		foreach(explode(',',$line) as $item){
			$dates[]=self::normalize_yearly_date_value($item);
		}
		return $dates;
	}
	public static function parse_monthly_line($line){
		$dates=[];
		$line=self::normalize_line_text($line);
		foreach(explode(',',$line) as $item){
			if(strpos($item,'~')!==false){
				$values=array_map(trim,explode('~',$item));
				if(empty($values[0])){$values[0]=1;}
				if(empty($values[1])){$values[1]=31;}
				array_push(
					$dates,
					...range(
						self::normalize_monthly_date_value($values[0]),
						self::normalize_monthly_date_value($values[1])
					)
				);
			}
			else{
				$dates[]=self::normalize_monthly_date_value($item);
			}
		}
		return $dates;
	}
	public static function parse_weekly_line($line){
		$days=[];
		$line=self::normalize_line_text($line);
		foreach(explode(',',$line) as $item){
			$days[]=self::normalize_day_value($item);
		}
		return $days;
	}
	public static function parse_daily_line($line){
		$line=self::normalize_line_text($line);
		$periods=[];
		foreach(explode(',',$line) as $item){
			$values=explode('~',$item);
			if(empty($values[0])){
				$periods[]=[
					'00:00',
					self::normalize_hour_value($values[1]),
				];
			}
			elseif(empty($values[1])){
				$periods[]=[
					self::normalize_hour_value($values[0]),
					'24:00'
				];
			}
			else{
				$periods[]=[
					self::normalize_hour_value($values[0]),
					self::normalize_hour_value($values[1])
				];	
			}
		}
		return $periods;
	}
	public static function parse_invalid_line($line){
		return false;
	}
	
	public static function normalize_line_text($line){
		$line=mb_convert_kana($line,'rn');
		$line=str_replace(['、','・'],',',$line);
		$line=str_replace('〜','~',$line);
		return $line;
	}
	public static function normalize_date_value($value,$base=null){
		// 省略された日付を補完してタイムスタンプの値を返す
		// 補完は$baseに指定した日時または最後に算出した日付を基準にする
		static $last_matches;
		if(empty($base)){
			if(empty($last_matches)){
				preg_match(self::DATETIME_PATTERN,wp_date('Y-m-d H:i'),$last_matches);
			}
		}
		else{
			preg_match(self::DATETIME_PATTERN,wp_date('Y-m-d H:i',strtotime($base)),$last_matches);
		}
		$value=str_replace('/','-',trim($value));
		preg_match(self::DATETIME_PATTERN,$value,$matches);
		if(empty($matches[3])){
			$matches[1]=$last_matches[1];
			$matches[2]=$last_matches[2];
			$matches[3]=$last_matches[3];
			if(
				isset($last_matches[4]) && 
				isset($last_matches[5]) && 
				isset($matches[4]) && 
				isset($matches[5]) && 
				$last_matches[4].$last_matches[5] >
				$matches[4].$matches[5]
			){
				$matches[3]++;
			}
		}
		if(empty($matches[4])){
			$matches[4]=$matches[5]='00';
		}
		if(empty($matches[1])){
			$matches[1]=$last_matches[1];
			if(empty($matches[2])){
				$matches[2]=$last_matches[2];
				if($last_matches[3]>$matches[3]){$matches[2]++;}
			}
			if($last_matches[2]>$matches[2]){$matches[1]++;}
		}
		if($matches[3]>31){$matches[3]-=31;$matches[2]++;}
		if($matches[2]>12){$matches[2]-=12;$matches[1]++;}
		$matches[0]=vsprintf('%04d-%02d-%02d %02d:%02d',array_pad(array_slice($matches,1),5,''));
		$last_matches=$matches;
		return self::strtotime($matches[0]);
	}
	public static function normalize_yearly_date_value($value,$base=null){
		// m/dで表記された日付や省略された日付をm-dのフォーマットにする
		// 省略された日付は$baseの日付もしくは最後に算出した日付を基準にする
		static $last_date;
		if(empty($base)){$base=$last_date;}
		if(is_string($base)){$base=explode('-',$base);}
		$value=explode('-',str_replace('/','-',trim($value)));
		if(!isset($value[1])){
			array_unshift($value,$base[0]);
			if($base[1]>$value[1]){$value[0]++;}
			if($value[0]>12){$value[0]=$value[0]%12;}
		}
		$last_date=$value;
		return vsprintf('%02d-%02d',$value);
	}
	public static function normalize_month_value($value){
		$value=mb_convert_kana($value,'rn');
		if($m=(int)$value){return $m;}
		if($m=array_search(
			strtolower($value),
			['','jan','feb','mar','apr','may','jun','jul','aug','oct','sep','nov','dec']
		)){return $m;}
	}
	public static function normalize_monthly_date_value($value){
		$value=mb_convert_kana($value,'rn');
		if(preg_match('/^第(\d)([月火水木金土日].+)/',$value,$matches)){
			return $matches[1].'-'.self::normalize_day_value($matches[2]);
		}
		if($d=(int)$value){return $d;}
	}
	public static function normalize_day_value($value){
		$value=mb_convert_kana($value,'rn');
		if($d=(int)$value){return $d;}
		$value=preg_replace('/曜日?/','',$value);
		if(($d=array_search(
			$value,
			['日','月','火','水','木','金','土']
		))!==false){return $d;}
		if(($d=array_search(
			strtolower($value),
			['sun','mon','tue','wed','thu','fri','sat']
		))!==false){return $d;}
	}
	public static function normalize_hour_value($value){
		$value=mb_convert_kana($value,'rn');
		$value=str_replace('：',':',$value);
		return vsprintf('%02d:%02d',explode(':',$value));
	}
	
	public static function strtotime($date_str){
		$date=new \DateTime($date_str,wp_timezone());
		return $date->getTimestamp();
	}
}

?>