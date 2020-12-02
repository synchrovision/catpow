<?php

$query=Catpow\query\query::create([
	'data_type'=>$req['data_type'],
	'data_name'=>$req['data_name'],
	'limit'=>-1
]);
$items=[];
$tags=[];
$data_type_class=cp::get_class_name('data_type',$req['data_type']);
foreach($query->loop() as $id=> $obj){
	$file=get_post_meta($id,'file',true);
	if(empty($tags[$file])){
		$tags[$file]=['label'=>$file,'id'=>(string)(count($tags)+1)];
	}
	$items[]=[
		'id'=>$id,
		'tags'=>[$tags[$file]['id']],
		'name'=>$data_type_class::get_name($obj),
		'title'=>$data_type_class::get_title($obj),
		'uri'=>$data_type_class::get_uri($obj),
	];
}
$tags=array_values($tags);
$res->set_data(compact('items','tags'));