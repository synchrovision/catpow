<?php
$param=json_decode($attr['param'],1)?:null;

if(!empty($attr['func'])){
	$class_name='\\Catpow\\blocks\\'.$attr['func'];
	if(!class_exists($class_name)){
		cp::include_plugin_file('functions/'.$attr['func'].'/block.php');
	}
	if(class_exists($class_name)){$class_name::render($param);}
}