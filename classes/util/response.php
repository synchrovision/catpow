<?php
/**
* レスポンス関連処理
* 
*/
namespace Catpow\util;
class response{
	/*ファイル出力*/
	public static function output($file){
		$mime=mime_content_type($file);
		$type=substr($mime,0,strpos($mime,'/'));
		header('Content-type: '.$mime);
		switch($type){
			case 'video':
			case 'audio':
				$size = filesize($file);
				$fp = fopen($file,"rb");
				$etag = md5($_SERVER["REQUEST_URI"]).$size;
				if(@$_SERVER["HTTP_RANGE"]){
					list($start,$end) = sscanf($_SERVER["HTTP_RANGE"],"bytes=%d-%d");
					if(empty($end)) $end = $start + 1000000 - 1;
					if($end>=($size-1)) $end = $size - 1;
					header("HTTP/1.1 206 Partial Content");
					header("Content-Range: bytes {$start}-{$end}/{$size}");
					$size = $end - $start + 1;
					fseek($fp,$start);
				}
				header("Accept-Ranges: bytes");
				header("Content-Length: {$size}");
				header("Etag: \"{$etag}\"");

				if($size) echo fread($fp,$size);

				fclose($fp);

				exit;
			default:
				readfile($file);
		}
		exit;
	}
	
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
		exit;
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