<?php
if(substr($_GET['file'],-4)!=='.svg'){
	header('HTTP/1.0 403 Forbidden');
	die();
}
$svg=file_get_contents($_GET['file']);

if(!empty($_GET['color'])){
	if(preg_match('/^#([a-fA-f0-9]{3}){1,2}$/',$_GET['color'])){
		$svg=str_replace('<svg ',"<svg fill='{$_GET['color']}' ",$svg);
	}
}
elseif(!empty($_GET['c'])){
	if(preg_match('/^\w+$/',$_GET['c'])){
		if(!empty($_GET['theme']) && preg_match('/^[\w\-]+$/',$_GET['theme'])){
			$json=preg_replace('@(/wp-content/).+$@',"$1themes/{$_GET['theme']}/json/colors.json",$_GET['file']);
		}
		else{
			$json=preg_replace('@(/wp-content/(themes/[\w\-]+|plugins/catpow/default)/).+$@','$1json/colors.json',$_GET['file']);
		}
		if(file_exists($json) && ($colors=json_decode(file_get_contents($json),true)) && $c=$colors[$_GET['c']]??null){
			if(isset($c))$svg=str_replace('<svg ',"<svg fill='{$c}' ",$svg);
		}
	}
}

header('Content-type: image/svg+xml');
echo $svg;