<?php
if(substr($_GET['uri'],-4)!=='.svg'){
	header('HTTP/1.0 403 Forbidden');
	die();
}
$url=($_SERVER['HTTPS']?'https://':'http://').$_SERVER['HTTP_HOST'].$_GET['uri'];
$svg=file_get_contents($url);

if(!empty($_GET['color'])){
	if(preg_match('/^#([a-fA-f0-9]{3}){1,2}$/',$_GET['color'])){
		$svg=str_replace('<svg ',"<svg color='{$_GET['color']} fill='currentcolor' ",$svg);
	}
}
elseif(!empty($_GET['c'])){
	if(preg_match('/^\w+$/',$_GET['c'])){
		if(!empty($_GET['theme']) && preg_match('/^[\w\-]+$/',$_GET['theme'])){
			$json=preg_replace('@(/wp-content/).+$@',"$1themes/{$_GET['theme']}/json/colors.json",$url);
		}
		else{
			$json=preg_replace('@(/wp-content/(themes/[\w\-]+|plugins/catpow/default)/).+$@','$1json/colors.json',$url);
		}
		if(($colors=json_decode(file_get_contents($json),true)) && $c=$colors[$_GET['c']]??null){
			if(isset($c))$svg=str_replace('<svg ',"<svg color='{$c}' fill='currentcolor' ",$svg);
		}
	}
}
header('Content-type: image/svg+xml');
echo $svg;