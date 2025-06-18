<?php
$data=[
	'label'=>__('タイプ','catpow'),
	'input'=>'select',
	'key'=>'element',
	'sub'=>[]
];
foreach(cp::glob('elements/art-frame-*/schema.json') as $key=>$schema_json){
	$schema=new Catpow\util\schema($schema_json);
	$element=basename(dirname($schema_json));
	$title=$schema->title??substr($element,10);
	$dir_url=str_replace(ABSPATH,home_url().'/',dirname($schema_json));
	$data['values'][$element]=$title;
	$data['mjs'][$element]=$dir_url.'/element.mjs';
	$data['sub'][$element][]=[
		'input'=>'json',
		'key'=>'params',
		'schema'=>$schema->schema,
		'debug'=>false,
		'default'=>$schema->get_default_value()
	];
	cp::use_element($element);
}
wp_localize_script('catpow','artframeSelectiveClasses',$data);