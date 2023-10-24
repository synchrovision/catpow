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
\cp::use_component('FixedBG');