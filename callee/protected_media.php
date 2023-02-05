<?php
include __DIR__.'/classes/autoload.php';
define('ABSPATH',dirname(__DIR__,4));
session_start();
$dir=ABSPATH.'/wp-content/uploads/';
$path=$_GET['path'];

$file=$dir.'/'.$path;
$mime=mime_content_type($file);
$type=strstr($mime,'/',true);
if(!is_allowd_file($file)){
	switch($type){
		case 'video':$alt_file_name='403.mp4';break;
		case 'audio':$alt_file_name='403.mp3';break;
		default:$alt_file_name='403.jpg';break;
	}
	$file=file_exists($dir.$alt_file_name)?$dir.$alt_file_name:dirname(__DIR__).'/default/images/'.$alt_file_name;
}
/*output*/
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


function is_allowd_file($file){
	if(strpos($file,'../') || strpos($file,'..¥')){return false;}
	$dirname='protected';
	if(file_exists($cond_file=dirname($file).'/cond.json') && $cond=json_decode(file_get_contents($cond_file),true)){
		if(check_cond($cond,$file)){return true;}
	}
	if(preg_match("|/wp-content/uploads/(sites/(?P<blog_id>\d+)/)?{$dirname}/p(?P<media_id>\d+)/|",$file,$matches)){
		$site_id=$matches['blog_id']?:'1';
		$media_id=$matches['media_id'];
		if(!empty(\cp::$data['allowed_protected_media'][$site_id][$media_id])){return true;}
	};
	return false;
}
function check_cond($cond,$file){
	if(isset($cond['time'])){
		if(isset($cond['time']['from']) && time() < (int)$cond['time']['from']){return false;}
		if(isset($cond['time']['to']) && time() > (int)$cond['time']['to']){return false;}
	}
	if(isset($cond['ip'])){
		if($cond['ip']==='admin'){
			if(
				!file_exists($ip_list=ABSPATH.'/wp-content/uploads/config/admin_ip.lst') || 
				!in_array($_SERVER['REMOTE_ADDR'],explode("\n",file_get_contents($ip_list)),true)
			){return false;}
		}
		else if(is_array($cond['ip']) && !in_array($_SERVE['REMOTE_ADDR'],$cond['ip'],true)){
			return false;
		}
	}
	return true;
}