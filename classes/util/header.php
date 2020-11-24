<?php
/**
* アップロードファイル関連のメソッド
* 
*/
namespace Catpow\util;
class header{
	/*ダウンロード*/
	public static function download($fname,$content){
		if(headers_sent()){die('headers already sent');}
		header('Content-Description: File Transfer');
		header('Content-Type: application/octet-stream; charset=Shift_JIS');
		header('Content-Disposition: attachment; filename="'.$fname.'"');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		if(is_callable($content)){$content();}
		elseif(file_exists($content)){include $content;}
		elseif($f=self::get_file_path($content)){include ($f);}
		else{echo $content;}
		die();
	}
	
	/*ストリーム*/
	public static function stream($callback,$param,$interval=1){
		if(headers_sent()){die('headers already sent');}
		header("Content-type: application/octet-stream");
		header("Transfer-encoding: chunked");
		while(ob_get_level()){ob_end_flush();}
		flush();
		while(true){
			$chunk=$callback($param);
			echo sprintf("%x\r\n", strlen($chunk));
			echo $chunk . "\r\n";
			sleep($interval);
		}
	}
}

?>