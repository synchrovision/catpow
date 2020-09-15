<?php
namespace Catpow;

include __DIR__.'/../lib/calendar/calendar.php';
include __DIR__.'/../lib/calendar/Cals_loop_format.php';


/**
* このクラスは他のクラスに依存しない形式に書き直す
* 休日の情報をGoogleCalendarから取得するようにする
* 任意のGoogleCalendarのカレンダーを表示できるようにする
*/

class calendar{
	private static $CalsNum=0;
	
	private $id;
	private $_prm=array();
	private $_cals=array();
	private $_html;
	
	/*基本メソッド*/
	function __construct($prm=null){
		$this->init($prm);
	}
	public function init($prm=null){
		$_prm_default=array(
			'year'=>'%s年','wareki'=>false,'month'=>'%s月','month_en'=>false,'month_ja'=>false,'start_week'=>1,
			'tab'=>false,'data'=>[],'range'=>null,'class'=>array()
		);
		if(is_null($prm)){$this->_prm=$_prm_default;}else{$this->_prm=array_merge($_prm_default,(array)$prm);}
		if(!empty($this->_prm['range'])){call_user_func_array([$this,'range'],(array)$this->_prm['range']);}
		else if(!empty($this->_prm['data'])){$this->data($this->_prm['data']);}
		else{$this->range(date('Y-m-d',strtotime('-1 month')),date('Y-m-d',strtotime('+1 month')));}
		$this->id='Cals'.self::$CalsNum;
		self::$CalsNum++;
	}
	public function get(){
		if(!isset($this->_html))$this->_create_html();
		return $this->_html;
	}
	public function write($format='div'){
		if($this->_prm['tab'])$this->write_tab();
		if(!isset($this->_html))$this->_create_html();
		if(!is_array($format)){$format=Cals_loop_format::$$format;}
		elseif(array_values($format)===$format){$format=Cals_loop_format::create($format);}
		$is_first=true;
		echo($format['before']);
		foreach($this->_html as $m=>&$cal){
			if($is_first){$is_first=false;}else{echo($format['between_loop']);}
			echo($format['before_loop']);
			echo($cal);
			echo($format['after_loop']);
		}
		echo($format['after']);
		if($this->_prm['legend'])$this->write_legend();
	}
	public function clear(){
		unset($this->_prm);
		unset($this->_cals);
		unset($this->_prm);
		return $this;
	}
	
	/*パーツ出力*/
	public function get_tab(){
		$rtn='<ul class="tab-control">';
		foreach($this->_cals as $m=>&$cal){
			$rtn.=sprintf('<li><a href="#%s">%s</a></li>',$this->id.'-'.$m,date('n月',strtotime($m)));
		}
		$rtn.='</ul>';
		return $rtn;
	}
	public function get_legend(){
		$rtn='<ul class="legend">';
		foreach($this->_prm['data'] as $name=>&$event){
			$rtn.=sprintf('<li class="%1$s">%2$s</li>',$name,$event['label']);
		}
		$rtn.='</ul>';
		return $rtn;
	}
	public function write_tab(){
		echo('<ul class="tab-control">');
		foreach($this->_cals as $m=>&$cal){
			printf('<li><a href="#%s">%s</a></li>',$this->id.'-'.$m,date('n月',strtotime($m)));
		}
		echo('</ul>');
	}
	public function write_legend(){
		echo('<ul class="legend">');
		foreach($this->_prm['data'] as $name=>&$event){
			printf('<li class="%1$s">%2$s</li>',$name,$event['label']);
		}
		echo('</ul>');
	}
	
	/*静的メソッド*/
	public static function wareki($time,$format='<span class="wareki">%s%d年</span>'){
		$wareki_arr=array('令和'=>'20190501','平成'=>'19890108','昭和'=>'19261225','大正'=>'19120730','明治'=>'18670101');
		foreach($wareki_arr as $gengou => $start_date){
			if((int)$start_date<(int)date('Ymd',$time)){
				return sprintf($format,$gengou,(int)date('Y',$time)-(int)(substr($start_date,0,4))+1);
			}
		}
	}
	public static function seireki($time,$format='<span class="seireki">%d年</span>'){
		return sprintf($format,date('Y',$time));
	}
	public static function month_en($time,$format='<span class="month_en">%s</span>'){
		$month_en_arr=array('January','February','March','April','May','June','July','August','September','October','November','December');
		return sprintf($format,$month_en_arr[(int)date('m',$time)-1]);
	}
	public static function month_ja($time,$format='<span class="month_ja">%s</span>'){
		$month_ja_arr=array('睦月','如月','弥生','卯月','皐月','水無月','文月','葉月','長月','神無月','霜月','師走');
		return sprintf($format,$month_ja_arr[(int)date('m',$time)-1]);
	}
	public static function dates_to_str($vals,$print_year=true,$seireki=true){
		$rtn='';
		$week_arr=array('日','月','火','水','木','金','土');
		$crr_year=-1;
		$crr_month=-1;
		$crr_date=-1;
		$date_span_start=-1;
		$date_hold=0;
		foreach((array)$vals as $i => $val){
			if(isset($vals[$i-1]) and isset($vals[$i+1])){
				if((int)date('Ymd',strtotime($vals[$i-1]))+1==(int)date('Ymd',strtotime($vals[$i+1]))-1){
					$date_hold++;
					continue;
				}
			}
			$year=date('Y',strtotime($val));
			$month=date('n',strtotime($val));
			$date=date('j',strtotime($val));
			$week=date('w',strtotime($val));
			$is_new_month=false;
			if($date_hold>0){
				$rtn.=sprintf('<span class="date_span_joint">〜</span><span class="date">%s</span><span class="date_unit">日</span><span class="week">（%s）</span>',$date,$week_arr[$week]);
				$date_hold=0;
				continue;
			}
			if($year!=$crr_year){
				$crr_year=$year;
				$crr_month=-1;
				if($print_year){
					if($seireki){
						$rtn.=sprintf('<span class="year">%s</span><span class="year_unit">年</span>',$year);
					}else{
						$rtn.=get_wareki($val,'<span class="year_era">%s</span><span class="year">%d</span><span class="year_unit">年</span>');
					}
				}
			}
			if($month!=$crr_month){
				$crr_month=$month;
				$is_new_month=true;
				$rtn.=sprintf('<span class="month_sep"></span><span class="month">%s</span><span class="month_unit">月</span>'.chr(10),$month);
			}
			if(!$is_new_month)$rtn.='<span class="date_sep">、</span>'.chr(10);
			$rtn.=sprintf('<span class="date">%s</span><span class="date_unit">日</span><span class="week">（%s）</span>',$date,$week_arr[$week]);
		}
		return $rtn;
	}
	public static function is_leap_year($year){
		return ($year%4 and $year%100!=0) or $year%400==0;
	}
	
	/*getter setter*/
	public function data($data=null){
		if(func_num_args()){
			$event_default=array(
				'type'=>'label',
				'date'=>'*',
				'class'=>array(),
				'label'=>'',
				'index'=>0,
				'name'=>'',
				'checked'=>array(),
				'icon'=>'',
				'href'=>'',
				'html'=>''
			);
			$index=1;
			foreach($data as $name=>&$event){
				$event=array_merge($event_default,$event);
				$event['key']=$name;
				$event['index']=$index++;
				if($event['type']==='checkbox' or $event['type']==='radio'){
					if(empty($event['label']))$event['label']=$name;
					if(empty($event['name']))$event['name']=$name.(($event['type']==='radio')?'':'[]');
				}
			}
			unset($event);
			$this->_prm['data']=$data;
			if(empty($this->_prm['range']))$this->_set_range_from_data();
			foreach($this->_cals as $m=>&$cal){
				foreach($this->_prm['data'] as $name=>&$event){
					if(is_string($event['date'])){
						$cal->set_data($event['date'],array('event_'.$name=>true));
					}else{
						foreach((array)$event['date'] as $i=>$d){
							$cal->set_data($d,array('event_'.$name=>true));
						}
					}
				}
			}
			unset($this->_html);
			return $this;
		}else{
			return $this->_prm['data'];
		}
	}
	public function range($arg1=null,$arg2=null){
		if(func_num_args()){
			if(func_num_args()==1){
				$arg2=$arg1;
				if(is_numeric($arg1)){
					if($arg1>0){$arg1=0;}else{$arg2=0;}
				}
			}
			$this->_prm['range']=array();
			$this->_prm['range'][0]=date('Y-m',strtotime(is_numeric($arg1)?(date('Y-m ').$arg1.' month'):$arg1));
			$this->_prm['range'][1]=date('Y-m',strtotime(is_numeric($arg2)?(date('Y-m ').$arg2.' month'):$arg2));
			unset($this->_cals);
			for($len=$this->length(),$m=0;$m<$len;$m++){
				$d=date('Y-m',strtotime($this->_prm['range'][0].' '.$m.' month'));
				$this->_cals[$d]=new Calendar(array(
					'now'=>$d,
					'start_week'=>$this->_prm['start_week']
				));
			}
			if(!empty($this->_prm['data']))$this->data($this->_prm['data']);
			unset($this->_html);
			return $this;
		}else{
			return $this->_prm['range'];
		}
	}
	public function length(){
		if(isset($this->_cals)){
			return count($this->_cals);
		}else if(isset($this->_prm['range'])){
			return ((int)substr($this->_prm['range'][1],0,4)-(int)substr($this->_prm['range'][0],0,4))*12+
								((int)substr($this->_prm['range'][1],5)-(int)substr($this->_prm['range'][0],5))+1;
		}else{
			return 0;
		}
	}
	
	/*補助メソッド*/
	private function _set_range_from_data(){
		$min_arr=array();
		$max_arr=array();
		$is_input=false;
		foreach($this->_prm['data'] as $name=>&$prm){
			$date=is_array($prm['date'])?$prm['date']:$prm['checked'];
			if(!$is_input)$is_input=$prm['type']!=='text';
			if(empty($date))continue;
			$min_arr[]=min($date);
			$max_arr[]=max($date);
		}
		if(empty($min_arr)){
			if($is_input){$this->range(0);}else{$this->_cals=array();}
		}else{
			$this->range(min($min_arr),max($max_arr));
		}
	}
	private function _create_html(){
		$this->_html=array();
		foreach($this->_cals as $m=>&$cal){
			$now=$cal->now();
			$html=sprintf('<table id="%s" class="calendar %s%s">'.chr(10),
				$this->id.'-'.$m,$now['month'].(!empty($this->_prm['class'])?(' '.implode(' ',$this->_prm['class'])):''),
				($m===date('Y-m'))?' active':''
			);
			$html.='<caption>';
			if($this->_prm['year'])$html.=sprintf('<span class="seireki">'.$this->_prm['year'].'</span>',$now['year']);
			if($this->_prm['wareki'])$html.=self::wareki($now['time']);
			if($this->_prm['month'])$html.=sprintf('<span class="month">'.$this->_prm['month'].'</span>',$now['mon']);
			if($this->_prm['month_en'])$html.=self::month_en($now['time']);
			if($this->_prm['month_ja'])$html.=self::month_ja($now['time']);
			$html.='</caption>'.chr(10).'<thead><tr>';
			foreach($cal->weeks() as $w){
				$html.='<th><p class="weeks">'.$w.'</p></th>';
			}
			$html.='</tr></thead>'.chr(10).'<tbody>'.chr(10);
			foreach($cal->days() as $week){
				$weekspan=array(1=>end($week),0=>reset($week));
				if(!$weekspan[0]['in_month']&&!$weekspan[1]['in_month'])break;
				$html.='<tr>';
				foreach($week as $day){
					if($day['in_month']){
						$day['class']=array('in_month',$day['weekday']);
						$events=array();
						$has_event=false;
						foreach($this->_prm['data'] as $name=>&$event){
							if(isset($day['event_'.$name])){
								$has_event=true;
								$day['class'][]=$name;
								$events[$name]=&$event;
							}
						}
						if($day['holiday'])$day['class'][]='holiday';
						if($has_event)$day['class'][]='event';
						if(!empty($this->_prm['callback']))$tmp=$this->_prm['callback']($day);
						$html.=sprintf('<td class="%s">',implode(' ',$day['class']));
						$html.=sprintf('<p class="date">%s</p>',$day['mday']);
						if($day['holiday'])$html.=sprintf('<p class="holiday">%s</p>',$day['holiday']);
						if(!empty($events)){
							$html.='<div class="events">'.chr(10);
							foreach($events as $name=>&$event){
								$html.=sprintf('<div class="event event%d %s">'.chr(10),$event['index'],$name);
								if($event['type']==='label'){
									$html.='<label>';
									if($event['href'])$html.=sprintf('<a class="link" href="%s">',$event['href']);
									if($event['icon'])$html.=$event['icon'];
									$html.=$event['label'];
									if($event['href'])$html.='</a>';
									$html.='</label>';
								}else if($event['type']==='checkbox' or $event['type']==='radio'){
									$html.=sprintf(
										'<label for="%1$s" data-rel-class="%6$s"><input type="%2$s" id="%1$s" name="%4$s" value="%3$s" data-role="none"%5$s>',
										$this->id.'-'.$event['key'].'-'.$day['date'],$event['type'],$day['date'],$event['name'],
										in_array($day['date'],$event['checked'])?' checked="true"':'',$name
									);
									if($event['icon'])$html.=$event['icon'];
									$html.=$event['label'];
									if($event['href'])$html.=sprintf('<a class="link" href="%s">　</a>',$event['href']);
									$html.='</label>';
								}else if($event['type']=='html'){
									$html.=sprintf('<div class="html">%s</div>',$event['html']);
								}
								$html.='</div>';
							}
							$html.='</div>';
						}
						if(isset($tmp)){$html.=$tmp;}
						
						$html.= '</td>';
					}else{
						$html.= sprintf('<td class="out_month"><p class="date">%s</p></td>',$day['mday']);
					}
				}
				$html.= '</tr>'.chr(10);
			}
			$html.= '</tbody>'.chr(10).'</table>'.chr(10);
			$this->_html[$m]=$html;
		}
	}
}


?>