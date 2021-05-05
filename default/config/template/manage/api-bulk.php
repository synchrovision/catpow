<?php
namespace Catpow;

$actions=[
	'delete'=>[
		'label'=>'削除',
		'callback'=>function($rows){
			return ['table'=>$GLOBALS['cpdb']->delete('<!--data_name-->',['meta_id'=>$rows])];
		}
	]
];

if($req['param']==='index'){
	$index=[];
	$tmpl=array_flip(['label','inputs']);
	foreach($actions as $name=>$conf){
		$index[$name]=array_intersect_key($conf,$tmpl);
	}
	$res->set_data($index);
	return;
}
$param=explode('/',$req['param']);
if($param[0]==='exec'){
	$res->set_data($actions[$param[1]]['callback']($req['rows']));
}