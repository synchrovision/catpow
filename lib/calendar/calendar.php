<?php
/**
 * カレンダークラス 曜日ナンバーはdate('w')に順ずる ※0が日曜日で6が土曜日
 * 
 * ■ 基本の使用方法
 * 1. インスタンス生成（動作モード等を変更する場合は引数で$settingsを入れる）
 *    ※settingの内容はプロパティ定義部分を参照
 * 2. set_data()を実行し各日付にデータを追加する。※省略可
 * 3. $array = days()を実行し、日付配列データを取得（modeがcalendarの場合は7個区切りの配列になる）
 * 
 * ■ その他のメソッド
 * 翌月や翌週のリンク用の日付
 *   → next(), prev() を使用
 * 選択中の日データ（現在の日時ではなく$settingsのnowの値）
 *   → now() を使用
 * 開始曜日から始まる順番に並び替えた曜日名配列を取得
 *   → weeks()
 * 開始日と終了日を取得する
 *   → span()
 *
 * 各日にちの配列の詳細は以下の通り
 *  mday        ：日にち
 *  wday        ：週番号（0が日曜日で6が土曜日）
 *  mon         ：月
 *  year        ：年
 *  yday        ：その年の通算の日数
 *  weekday     ：英語の曜日名
 *  month       ：英語の月名
 *  date        ：$settings['format']に準じた書式の日付
 *  weekname    ：$settings['weekname']に準じた曜日名
 *  status      ：今の日にちと比較して過去なら past、当日ならtoday、未来なら future が代入される
 *  in_month    ：現在選択中の月に属している場合は true、そうでない場合は false
 *  selected    ：現在選択中の日の場合は true、それ以外はfalse
 *  holiday     ：休日名
 *  time        ：タイムスタンプ
 *  
 *  
 *
 * @author   PG103
 * @since    2011/07/26
 * @see      
---------------------------------------------------------------------------------------------- */

class Calendar {
	/**
	 * 設定
	 * @var      array
	 * @access   protected
	 */
	protected $settings_default = array(
		//日付フォーマットdate関数に順ずる形のみ受付
		'format'     => 'Y-m-d',
		//0から6までの曜日名
		'weeks'      => array('日', '月', '火', '水', '木', '金', '土', '日'),
		//週の開始曜日No
		'start_week' => 0,
		//基準日、formatにのっとった形式
		'now'        => null,
		//モード week：一週間、calendar：一ヶ月を週区切り、month：一ヶ月
		'mode'       => 'calendar',
	);
	
	/**
	 * 基準日の情報
	 * @var      array
	 * @access   protected
	 */
	protected $now = array();
	
	/**
	 * 設定
	 * @var      array
	 * @access   protected
	 */
	protected $settings = array();
	
	/**
	 * 日付配列
	 * @var      array
	 * @access   
	 */
	protected $days = array();
	
	/**
	 * 休日クラス
	 * @var      object
	 * @access   
	 */
	public $Holiday;
	
	/**
	 * __construct
	 * @access   public
	 * @param    
	 * @return   
	 * @author   PG103
	 * @since    2011/07/26
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	public function __construct($settings=array()) {
		if (!class_exists('Holiday') && file_exists(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'holiday.php')) {
			require_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'holiday.php');
		}
		
		if (class_exists('Holiday')) {
			$this->Holiday = new Holiday();
		}
		
		
		$this->initialize($settings);
	}
	
	
	/**
	 * 日付配列の作成
	 * @access   public
	 * @param    
	 * @return   
	 * @author   PG103
	 * @since    2011/07/26
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	protected function set_days() {
		$this->days = array();
		//modeがweekの場合
		if ($this->settings['mode'] == 'week') {
			$days = 7;
			$backday = $this->get_week_backday($this->now['wday'], $this->settings['start_week']);
			$start_time = $this->now['time'] - (86400 * $backday);
		}
		//それ以外の場合
		else {
			//開始日
			$start_time = mktime(0, 0, 0, $this->now['mon'], 1, $this->now['year']);
			$days = date('t', $this->now['time']);
			//weeksの場合はさらに開始日が変わる
			if ($this->settings['mode'] == 'calendar') {
				$backday = $this->get_week_backday(date('w', $start_time), $this->settings['start_week']);
				$days += $backday;
				$start_time = $start_time - (86400 * $backday);
			}
		}
		//日付配列の作成
		for ($i=0; $i<$days; $i++) {
			$time = $start_time + (86400 * $i);
			$this->days[date($this->settings['format'], $time)] = $this->_getdate($time);
		}
		
		//weeksの場合は最終日から、最終曜日まで補完
		if ($this->settings['mode'] == 'calendar') {
			$last_day =  $this->days[date($this->settings['format'], $time)];
			$addday = 7-count($this->days)%7;
			for ($j=0; $j<=$addday; $j++) {
				$time = $last_day['time'] + (86400 * $j);
				$this->days[date($this->settings['format'], $time)] = $this->_getdate($time);
			}
		}
	}
	
	
	/**
	 * 週の最初の日までの差を算出
	 * @access   public
	 * @param    array 日付データ配列
	 * @param    array 開始曜日No
	 * @return   
	 * @author   PG103
	 * @since    2011/07/26
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	protected function get_week_backday($now_week, $start_week) {
			//開始曜日より大きい場合
			if ($now_week >= $start_week) {
				$backday = $now_week - $start_week;
			}
			else {
				$backday = 7 - ($start_week - $now_week);
			}
			
			return $backday;
		
	}
	
	
	/**
	 * 日付をセッティングに準じた形にフォーマットする
	 * @access   public
	 * @param    string 日付
	 * @return   string フォーマット後の日付
	 * @author   PG103
	 * @since    2011/07/27
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	protected function format($date, $format='') {
		if (!$format) {
			$format = $this->settings['format'];
		}
		return date($format, strtotime($date));
	}
	
	
	/**
	 * 初期設定
	 * @access   public
	 * @param    array 設定配列
	 * @return   
	 * @author   PG103
	 * @since    2011/07/26
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	public function initialize($settings=array()) {
		$this->settings = array_merge($this->settings_default, $settings);
		//nowが設定されている場合
		if ($this->settings['now']) {
			//フォーマットを完全に統一する
			$this->settings['now'] = $this->format($this->settings['now']);
			//19700101の場合は不正なのでnullにする
			if (date('Ymd', strtotime($this->settings['now'])) == '19700101') {
				$this->settings['now'] = null;
			}
		}
		
		if (!$this->settings['now']) {
			$this->settings['now'] = date($this->settings['format']);
		}
		
		$this->now = $this->_getdate($this->settings['now'], true);
		$this->set_days();
	}
	
	
	/**
	 * getdateのオリジナル版
	 * @access   public
	 * @param    mixed タイムスタンプ、もしくはdate型の文字列
	 * @param    bool nowのセット時のみtrue
	 * @return   
	 * @author   PG103
	 * @since    2011/07/26
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	public function _getdate($time=null, $now=false) {
		$now_time = strtotime(date('Y-m-d'));
		if (!$time) {
			$time = $now_time;
		}
		//dateが文字列の場合
		elseif (!is_numeric($time)) {
			$time = strtotime($time);
		}
		
		$ret_array = getdate($time);
		
		//不要なものを削除
		unset($ret_array['seconds']);
		unset($ret_array['minutes']);
		unset($ret_array['hours']);
		unset($ret_array[0]);
		
		//フォーマット
		$ret_array['date'] = date($this->settings['format'], $time);
		//曜日名
		$ret_array['weekname'] = $this->settings['weeks'][$ret_array['wday']];
		//過去、未来、現在ステータス
		if ($now_time == $time) {
			$ret_array['status'] = 'today';
		}
		elseif ($now_time > $time) {
			$ret_array['status'] = 'past';
		}
		elseif ($now_time < $time) {
			$ret_array['status'] = 'future';
		}
		
		//基準月と同じかどうか
		if (!$now) {
			$ret_array['in_month'] = $this->settings['mode'] == 'week' || $this->now['month'] == $ret_array['month'] ? true : false;
			$ret_array['selected'] = $this->now['time'] == $time ? true : false;
		}
		else {
			$ret_array['in_month'] = true;
			$ret_array['selected'] = false;
		}
		
		
		$ret_array['holiday'] = '';
		if (is_object($this->Holiday)) {
			$ret_array['holiday'] = $this->Holiday->ktHolidayName($time);
		}
		
		$ret_array['time'] = $time;
		
		return $ret_array;
	}
	
	
	/**
	 * 日付データに任意のデータを追加
	 * @access   public
	 * @param    string 対象の日付(*にすると全部、その他にpast, future, today, in_month, out_month, selected, 曜日名が使用可能)
	 * @param    array マージする配列
	 * @return   bool 成功した場合はtrue
	 * @author   PG103
	 * @since    2011/07/27
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	public function set_data($date, $array) {
		$return = false;
		
		//todayとselectedの場合
		if ($date == 'today'){
			$date = date($this->settings['format']);
		}
		elseif ($date == 'selected') {
			$date = $this->now('date');
		}
		
		//*
		if ($date == '*') {
			foreach ($this->days as $key => $arr) {
				$this->days[$key] = array_merge($arr, $array);
			}
			$return = true;
		}
		//past future in_month, out_month
		elseif ($date == 'past' || $date == 'future' || $date == 'in_month' || $date == 'out_month') {
			switch ($date) {
				case 'past' :
					$target_key = 'status';
					$target_val = 'past';
					break;
				
				case 'future' :
					$target_key = 'status';
					$target_val = 'future';
					break;
				case 'in_month' :
					$target_key = 'in_month';
					$target_val = true;
					break;
				default :
					$target_key = 'in_month';
					$target_val = false;
					break;
			}
			
			foreach ($this->days as $key => $arr) {
				if ($arr[$target_key] === $target_val) {
					$this->days[$key] = array_merge($arr, $array);
				}
			}
			$return = true;
		}
		else {
			$date = $this->format($date);
			if (isset($this->days[$date])) {
				$this->days[$date] = array_merge($this->days[$date], $array);
				$return = true;
			}
		}
		
		
		return $return;
	}
	
	
	/**
	 * 日付配列を取得
	 * @access   public
	 * @param    bool trueの場合はモードかcalendarでもそのまま返却
	 * @return   array plainがfalseの場合は必ず配列が一階層下がります
	 * @author   PG103
	 * @since    2011/07/27
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	public function days($plain=false) {
		if ($plain) {
			return $this->days;
		}
		elseif ($this->settings['mode'] == 'calendar'){
			return array_chunk($this->days, 7, true);
		}
		else {
			return array($this->days);
		}
	}
	
	
	/**
	 * next prevのコールバック
	 * @access   public
	 * @param    sting +1 or -1
	 * @param    string week or month 省略時は設定に従う
	 * @param    string 取得するキー名。省略時は配列が返ってくる
	 * @return   
	 * @author   PG103
	 * @since    2011/07/26
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	public function change_day($day, $mode, $key) {
		if ($mode != 'week' && $mode != 'month' && $mode != 'year' && $mode != 'day') {
			$mode = $this->settings['mode'];
		}
		
		if ($mode == 'calendar') {
			$mode = 'month';
		}
		
		$time = strtotime($day . ' ' . strtoupper($mode), $this->now['time']);
		$time = $this->_getdate($time);
		if ($key) {
			return isset($time[$key]) ? $time[$key] : null;
		}
		return $time;
	}
	
	
	/**
	 * 次の日付を取得
	 * @access   public
	 * @param    string week or month 省略時は設定に従う
	 * @param    string 取得するキー名。省略時は配列が返ってくる
	 * @return   mixed 次の日のデータ
	 * @author   PG103
	 * @since    2011/07/26
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	public function next($key=null, $mode='') {
		return $this->change_day('+1', $mode, $key);
	}
	
	
	/**
	 * 前の日付を取得
	 * @access   public
	 * @param    string week or month 省略時は設定に従う
	 * @param    string 取得するキー名。省略時は配列が返ってくる
	 * @return   mixed 次の日のデータ
	 * @author   PG103
	 * @since    2011/07/26
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	public function prev($key=null, $mode='') {
		return $this->change_day('-1', $mode, $key);
	}
	
	
	/**
	 * 現在の日データの取得
	 * @access   public
	 * @param    string 取得するキー名
	 * @return   mixed キー名を指定した場合はその値、それ以外は配列
	 * @author   PG103
	 * @since    2011/07/26
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	public function now($key='') {
		if ($key) {
			return isset($this->now[$key]) ? $this->now[$key] : null;
		}
		return $this->now;
		
	}
	
	
	/**
	 * 開始曜日から始まる順番に並び替えた曜日名配列を取得
	 * @access   public
	 * @param    
	 * @return   array 配列
	 * @author   PG103
	 * @since    2011/07/26
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	public function weeks() {
		$weeks = $this->settings['weeks'];
		$array_before = array();
		$array_after = array();
		for ($i=0; $i<7; $i++) {
			if ($i >= $this->settings['start_week']) {
				$array_before[$i] = $this->settings['weeks'][$i];
			}
			else {
				$array_after[$i] = $this->settings['weeks'][$i];
				
			}
		}
		
		return $array_before + $array_after;
	}
	
	
	/**
	 * 開始日と終了日を取得する
	 * @access   public
	 * @param    string 日付のフォーマット
	 * @param    bool モードがcalendarの場合にtrueをいれるとその月のみの範囲を取得
	 * @return   array 開始日と終了日の配列
	 * @author   PG103
	 * @since    2011/07/27
	 * @see      
	---------------------------------------------------------------------------------------------- */
	
	public function span($format='', $in_month=false) {
		if ($this->settings['mode'] == 'calendar' && $in_month) {
			$start = $this->_getdate(strtotime($this->now['year'] . '-' . $this->now['mon'] . '-01'));
			$end = $this->_getdate(strtotime($this->now['year'] . '-' . $this->now['mon'] . '-' . date('t', $this->now['time'])));
		}
		else {
			$start = array_shift(array_values($this->days));
			$end = array_pop(array_values($this->days));
		}
		
		$ret_array[0] = $this->format($start['date'], $format);
		$ret_array[1] = $this->format($end['date'], $format);
		
		return $ret_array;
	}
	
	
}
?>