<?php
$param=json_decode($attr['param'],1)?:null;

if(!empty($attr['func'])){
	$class_name='\\Catpow\\'.$attr['func'].'\\Widget';
	if(class_exists($class_name)){$class_name::render($param);}
}