<?php
include __DIR__.'/classes/autoload.php';
session_start();
$dir=dirname(__DIR__,3).'/uploads/';
$path=$_GET['path'];
preg_match('|(sites/(?P<blog_id>\d+)/)?catpow/p(?P<media_id>\d+)/|',$path,$matches);
$site_id=$matches['blog_id']?:'1';
$media_id=$matches['media_id'];

if(empty(\cp::$data['allowed_protected_media'][$site_id][$media_id]) || strpos($path,'../') || strpos($path,'..¥')){
	header('HTTP/1.0 403 Forbidden');
	die();
}

$file=$dir.'/'.$path;
$mime=mime_content_type($file);
$type=substr($mime,0,strpos($mime,'/'));
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
