<?php
/**
 * ktHolidayNameをクラス版に修正したもの
 * 
 * 
 *
 * @author   PG103
 * @since    2011/07/29
 * @see      
---------------------------------------------------------------------------------------------- */

class Holiday {
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	//_/
	//_/  CopyRight(C) K.Tsunoda(AddinBox) 2001 All Rights Reserved.
	//_/  ( http://www.h3.dion.ne.jp/~sakatsu/index.htm )
	//_/
	//_/    この祝日判定コードは『Excel:kt関数アドイン』で使用している
	//_/    ＶＢＡマクロを[PHP]に移植したものです。
	//_/    この関数では、２００７年施行の改正祝日法(昭和の日)までを
	//_/  　サポートしています(９月の国民の休日を含む)。
	//_/
	//_/  (*1)このコードを引用するに当たっては、必ずこのコメントも
	//_/      一緒に引用する事とします。
	//_/  (*2)他サイト上で本マクロを直接引用する事は、ご遠慮願います。
	//_/      【 http://www.h3.dion.ne.jp/~sakatsu/holiday_logic.htm 】
	//_/      へのリンクによる紹介で対応して下さい。
	//_/  (*3)[ktHolidayName]という関数名そのものは、各自の環境に
	//_/      おける命名規則に沿って変更しても構いません。
	//_/  
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

	function ktHolidayName($MyDate)
	{
		if (!defined("MONDAY")) {
		  define("MONDAY","2");
		}
	  $cstImplementHoliday = mktime(0,0,0,4,12,1973); // 振替休日施行

	  $HolidayName = $this->prvHolidayChk($MyDate);
	  if ($HolidayName == "") {
	      if ($this->Weekday($MyDate) == MONDAY) {
	          // 月曜以外は振替休日判定不要
	          // 5/6(火,水)の判定はprvHolidayChkで処理済
	          // 5/6(月)はここで判定する
	          if ($MyDate >= $cstImplementHoliday) {
	              $YesterDay = mktime(0,0,0,$this->Month($MyDate),
	                                      ($this->Day($MyDate) - 1),$this->Year($MyDate));
	              $HolidayName = $this->prvHolidayChk($YesterDay);
	              if ($HolidayName != "") {
	                  $Result = "振替休日";
	              } else {
	                  $Result = "";
	              }
	          } else {
	              $Result = "";
	          }
	      } else {
	          $Result = "";
	      }
	  } else {
	      $Result = $HolidayName;
	  }

	  return $Result;
	}

	//========================================================================

	function prvHolidayChk($MyDate)
	{
	
	  if (!defined('MONDAY')) {
		 define("MONDAY","2");
	  }
	  if (!defined('TUESDAY')) {
		 define("TUESDAY","3");
	  }
	  if (!defined('WEDNESDAY')) {
		 define("WEDNESDAY","4");
	  }

	  $cstImplementTheLawOfHoliday = mktime(0,0,0,7,20,1948);  // 祝日法施行
	  $cstShowaTaiso = mktime(0,0,0,2,24,1989);                // 昭和天皇大喪の礼
	  $cstAkihitoKekkon = mktime(0,0,0,4,10,1959);             // 明仁親王の結婚の儀
	  $cstNorihitoKekkon = mktime(0,0,0,6,9,1993);             // 徳仁親王の結婚の儀
	  $cstSokuireiseiden = mktime(0,0,0,11,12,1990);           // 即位礼正殿の儀

	  $MyYear = $this->Year($MyDate);
	  $MyMonth = $this->Month($MyDate);
	  $MyDay = $this->Day($MyDate);

	  if ($MyDate < $cstImplementTheLawOfHoliday)
	      return "";    // 祝日法施行以前
	  else;

	  $Result = "";
	  switch ($MyMonth) {
	  // １月 //
	  case 1:
	      if ($MyDay == 1) {
	          $Result = "元日";
	      } else {
	          if ($MyYear >= 2000) {
	              $strNumberOfWeek = 
	                        (floor(($MyDay - 1) / 7) + 1) . $this->Weekday($MyDate);
	              if ($strNumberOfWeek == "22") {    //Monday:2
	                  $Result = "成人の日";
	              } else;
	          } else {
	              if ($MyDay == 15) {
	                  $Result = "成人の日";
	              } else;
	          }
	      }
	      break;
	  // ２月 //
	  case 2:
	      if ($MyDay == 11) {
	          if ($MyYear >= 1967) {
	              $Result = "建国記念の日";
	          } else;
	      } elseif ($MyDate == $cstShowaTaiso) {
	          $Result = "昭和天皇の大喪の礼";
	      } else;
	      break;
	  // ３月 //
	  case 3:
	      if ($MyDay == $this->prvDayOfSpringEquinox($MyYear)) {    // 1948～2150以外は[99]
	          $Result = "春分の日";                        // が返るので､必ず≠になる
	      } else;
	      break;
	  // ４月 //
	  case 4:
	      if ($MyDay == 29) {
	          if ($MyYear >= 2007) {
	              $Result = "昭和の日";
	          } elseif ($MyYear >= 1989) {
	              $Result = "みどりの日";
	          } else {
	              $Result = "天皇誕生日";
	          }
	      } elseif ($MyDate == $cstAkihitoKekkon) {
	          $Result = "皇太子明仁親王の結婚の儀";
	      } else;
	      break;
	  // ５月 //
	  case 5:
	      if ($MyDay == 3) {
	          $Result = "憲法記念日";
	      } elseif ($MyDay == 4) {
	          if ($MyYear >= 2007) {
	              $Result = "みどりの日";
	          } elseif ($MyYear >= 1986) {
	              if ($this->Weekday($MyDate) > MONDAY) {
	                  // 5/4が日曜日は『只の日曜』､月曜日は『憲法記念日の振替休日』(～2006年)
	                  $Result = "国民の休日";
	              } else;
	          } else;
	      } elseif ($MyDay == 5) {
	          $Result = "こどもの日";
	      } elseif ($MyDay == 6) {
	          if ($MyYear >= 2007) {
	              // 07/5/26 if 条件の一番外側のカッコ不足を修正
	              if (($this->Weekday($MyDate) == TUESDAY) || ($this->Weekday($MyDate) == WEDNESDAY)) {
	                  $Result = "振替休日";    // [5/3,5/4が日曜]ケースのみ、ここで判定
	              } else;
	          } else;
	      } else;
	      break;
	  // ６月 //
	  case 6:
	      if ($MyDate == $cstNorihitoKekkon) {
	          $Result = "皇太子徳仁親王の結婚の儀";
	      } else;
	      break;
	  // ７月 //
	  case 7:
	      if ($MyYear >= 2003) {
	          $strNumberOfWeek = 
	                    (floor(($MyDay - 1) / 7) + 1) . $this->Weekday($MyDate);
	          if ($strNumberOfWeek == "32") {    //Monday:2
	              $Result = "海の日";
	          } else;
	      } elseif ($MyYear >= 1996) {
	          if ($MyDay == 20) {
	              $Result = "海の日";
	          } else;
	      } else;
	      break;
	  // ９月 //
	  case 9:
	      //第３月曜日(15～21)と秋分日(22～24)が重なる事はない
	      $MyAutumnEquinox = $this->prvDayOfAutumnEquinox($MyYear);
	      if ($MyDay == $MyAutumnEquinox) {    // 1948～2150以外は[99]
	          $Result = "秋分の日";            // が返るので､必ず≠になる
	      } else {
	          if ($MyYear >= 2003) {
	              $strNumberOfWeek = 
	                      (floor(($MyDay - 1) / 7) + 1) . $this->Weekday($MyDate);
	              if ($strNumberOfWeek == "32") {    //Monday:2
	                  $Result = "敬老の日";
	              } elseif ($this->Weekday($MyDate) == TUESDAY) {
	                  if ($MyDay == ($MyAutumnEquinox - 1)) {
	                      $Result = "国民の休日";
	                  } else;
	              } else;
	          } elseif ($MyYear >= 1966) {
	              if ($MyDay == 15) {
	                  $Result = "敬老の日";
	              } else;
	          } else;
	      }
	      break;
	  // １０月 //
	  case 10:
	      if ($MyYear >= 2000) {
	          $strNumberOfWeek = 
	                    (floor(( $MyDay - 1) / 7) + 1) . $this->Weekday($MyDate);
	          if ($strNumberOfWeek == "22") {    // Monday:2
	              $Result = "体育の日";
	          } else;
	      } elseif ($MyYear >= 1966) {
	          if ($MyDay == 10) {
	              $Result = "体育の日";
	          } else;
	      } else;
	      break;
	  // １１月 //
	  case 11:
	      if ($MyDay == 3) {
	          $Result = "文化の日";
	      } elseif ($MyDay == 23) {
	          $Result = "勤労感謝の日";
	      } elseif ($MyDate == $cstSokuireiseiden) {    // 07/04/11 $抜け修正
	          $Result = "即位礼正殿の儀";
	      } else;
	      break;
	  // １２月 //
	  case 12:
	      if ($MyDay == 23) {
	          if ($MyYear >= 1989) {
	              $Result = "天皇誕生日";
	          } else;
	      } else;
	      break;
	  }
	  return $Result;
	}

	//======================================================================
	//  春分/秋分日の略算式は
	//    『海上保安庁水路部 暦計算研究会編 新こよみ便利帳』
	//  で紹介されている式です。
	function prvDayOfSpringEquinox($MyYear)
	{
	  if ($MyYear <= 1947)
	      $Result = 99; //祝日法施行前
	  elseif ($MyYear <= 1979)
	      // floor 関数は[VBAのInt関数]に相当
	      $Result = floor(20.8357 + 
	            (0.242194 * ($MyYear - 1980)) - floor(($MyYear - 1980) / 4));
	  elseif ($MyYear <= 2099)
	      $Result = floor(20.8431 + 
	            (0.242194 * ($MyYear - 1980)) - floor(($MyYear - 1980) / 4));
	  elseif ($MyYear <= 2150)
	      $Result = floor(21.851 + 
	            (0.242194 * ($MyYear - 1980)) - floor(($MyYear - 1980) / 4));
	  else
	      $Result = 99; //2151年以降は略算式が無いので不明

	  return $Result;
	}

	//========================================================================
	function prvDayOfAutumnEquinox($MyYear)
	{
	  if ($MyYear <= 1947)
	      $Result = 99; //祝日法施行前
	  elseif ($MyYear <= 1979)
	      // floor 関数は[VBAのInt関数]に相当
	      $Result = floor(23.2588 + 
	            (0.242194 * ($MyYear - 1980)) - floor(($MyYear - 1980) / 4));
	  elseif ($MyYear <= 2099)
	      $Result = floor(23.2488 + 
	            (0.242194 * ($MyYear - 1980)) - floor(($MyYear - 1980) / 4));
	  elseif ($MyYear <= 2150)
	      $Result = floor(24.2488 + 
	            (0.242194 * ($MyYear - 1980)) - floor(($MyYear - 1980) / 4));
	  else
	      $Result = 99; //2151年以降は略算式が無いので不明

	  return $Result;
	}

	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	//_/  CopyRight(C) K.Tsunoda(AddinBox) 2001 All Rights Reserved.
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

	function Weekday($MyDate){
	  return strftime("%w",$MyDate) + 1;  // 日(1),月(2)‥‥土(7)
	}

	function Year($MyDate){
	  return strftime("%Y",$MyDate) - 0;  // 数値で返す
	}

	function Month($MyDate){
	  return strftime("%m",$MyDate) - 0;  // 数値で返す
	}

	function Day($MyDate){
	  return strftime("%d",$MyDate) - 0;  // 数値で返す
	}

	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	//_/  Visual Basic Compatibility functions for PHP
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
}
