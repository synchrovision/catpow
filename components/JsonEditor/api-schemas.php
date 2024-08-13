<?php
namespace Catpow;

$schemas=[];
foreach($req['components'] as $component){
	if($f=CP::get_file_path("components/JsonEditor/{$component}/schema.php")){
		$schemas[$component]=include $f;
	}
	if($f=CP::get_file_path("components/JsonEditor/{$component}/schema.json")){
		$schemas[$component]=json_decode(file_get_contents($f),true);
	}
}
$res->set_data($schemas);