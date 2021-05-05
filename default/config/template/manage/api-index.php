<?php
namespace Catpow;
$rows=[];
$cols=array_map(function($col){
	$meta_type_class=CP::get_class_name('meta',$col['type']);
	return $meta_type_class::resolve_conf($col);
},cp::get_conf_data('<!--data_type-->/<!--data_name-->')['meta']);

foreach(loop('<!--data_type-->/<!--data_name-->') as $id=>$obj){
	$row=['_id'=>$id];
	foreach($cols as $name=>$col){
		$row[$name]=meta($name)->value;
	}
	$rows[]=$row;
}
$res->set_data(compact('cols','rows'));