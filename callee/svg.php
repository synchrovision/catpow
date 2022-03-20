<?php
if(substr($_GET['uri'],-4)!=='.svg'){
	header('HTTP/1.0 403 Forbidden');
	die();
}
$file=dirname(__DIR__,4).strstr($_GET['uri'],'/wp-content/');
if(!file_exists($file)){$file=(!empty($_SERVER['HTTPS'])?'https://':'http://').$_SERVER['HTTP_HOST'].$_GET['uri'];}
$svg=file_get_contents($file);

if(!empty($_GET['color'])){
	if(preg_match('/^#([a-fA-f0-9]{3}){1,2}$/',$_GET['color'])){
		$svg=str_replace('<svg ',"<svg color='{$_GET['color']} fill='currentcolor' ",$svg);
	}
}
elseif(!empty($_GET['c'])){
	if(preg_match('/^(\w+?)(-)?(\d+)?$/',$_GET['c'],$matches)){
		$key=$matches[1]??'m';
		$staticHue=!empty($matches[2]);
		$num=$matches[3];
		$config_dir=dirname(__DIR__,3)."/config";
		if(file_exists($sites=$config_dir.'/sites.json') && $sites=json_decode(file_get_contents($sites),true)){
			$site=$sites[$_SERVER['HTTP_HOST'].strstr($_SERVER['REQUEST_URI'],'/wp-content/',true).'/']??null;
		}
		if(empty($_GET['theme'])){
			if(preg_match('@/wp-content/themes/(?P<theme>[\w\-]+)/@',$file,$matches)){
				$theme=$matches['theme'];
			}
		}
		elseif(preg_match('/^[\w\-]+$/',$_GET['theme'])){
			$theme=$_GET['theme'];
		}
		if(!empty($theme)){
			$json=$config_dir.($site?"/{$site}/":'/').$theme.'/tones.json';
			if(!file_exists($json)){
				$json=preg_replace('@(/wp-content/).+$@',"$1themes/{$theme}/json/tones.json",$file);
			}
		}
		else{
			$json=dirname(__DIR__).'/default/json/tones.json';
		}
		if(($tones=json_decode(file_get_contents($json),true)) && $tone=$tones[$key]??null){
			if(isset($num)){
				$c=sprintf('hsl(%s,%s,%s)',$staticHue?$num:($tone['h']+($num-6)*$tones['hr']),$tone['s'],$tone['l']);
			}
			else{
				$c=sprintf('hsl(%s,%s,%s)',$tone['h'],$tone['s'],$tone['l']);
			}
			$svg=str_replace('<svg ',"<svg color='{$c}' fill='currentcolor' ",$svg);
		}
	}
}
header('Content-type: image/svg+xml');
echo $svg;