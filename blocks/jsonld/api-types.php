<?php
$types=[];
$formals=[];
foreach(glob(__DIR__.'/schema/*.json') as $json_file){
	if(basename($json_file)==='schema.json'){continue;}
	$data=json_decode(file_get_contents($json_file),true);
	$types[$data['name']]=$data;
}
foreach(glob(__DIR__.'/schema/formal/*.json') as $json_file){
	$data=json_decode(file_get_contents($json_file),true);
	$formals[$data['name']]=$data;
}
$res->set_data(['types'=>$types,'formals'=>$formals]);