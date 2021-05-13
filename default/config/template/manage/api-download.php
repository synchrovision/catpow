<?php
namespace Catpow;
$rows=[];
$cols=cp::get_conf_data('<!--data_type-->/<!--data_name-->')['meta'];

$row=[];
foreach($cols as $name=>$col){
	$row[]=$name;
}
$rows[]=$row;
foreach(loop('<!--data_type-->/<!--data_name-->',['where'=>['meta_id'=>$req['rows']]]) as $id=>$obj){
	$row=[];
	foreach($cols as $name=>$col){
		$row[]=meta($name)->value;
	}
	$rows[]=$row;
}
$csv=new CSV($rows);
$csv->flatten();
error_log(var_export($req['rows'],1).__FILE__.__LINE__);
error_log(var_export($rows,1).__FILE__.__LINE__);
$res->set_data([
	'name'=>'<!--data_name-->',
	'data'=>$csv->get_output()
]);