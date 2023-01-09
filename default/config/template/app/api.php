<?php
namespace Catpow;
$conf=cp::get_conf_data('<!--path-->');
$items=[];
foreach(loop('<!--path-->') as $id=>$object){
	$item=[
		'id'=>$id,
		'url'=>this()->get_the_url(),
		'title'=>this()->the_title,
		'name'=>this()->the_name,
	];
	foreach($conf['meta'] as $meta_name=>$meta_conf){
		$item['meta'][$meta_name]=meta($meta_name)->props;
	}
	$items[]=$item;
}
$res->set_data([
	'conf'=>$conf,
	'items'=>$items
]);