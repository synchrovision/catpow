<?php
$components=[];
foreach(\cp::get_file_paths('components/Animation') as $dir){
	foreach(glob($dir.'/*/params.php') as $param_php){
		$components[basename(dirname($param_php))]=true;
	}
}
$components=array_keys($components);
foreach($components as $component){
	\cp::use_component('Animation/'.$component);
}
$items=[
	['values'=>[],'key'=>'component','sub'=>[]]
];
foreach($components as $component){
	$items[0]['values'][]=$component;
	include \cp::get_file_path('components/Animation/'.$component.'/params.php');
	$items[0]['sub'][$component]=$params;
}

$res->set_data([
	'items'=>$items,
	'deps'=>Catpow\util\wp::get_deps()
]);