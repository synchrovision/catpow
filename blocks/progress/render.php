<?php
namespace Catpow;
include __DIR__.'/default-settings.php';
if($attr['post']==='default'){
	$settings=$default_settings;
}
else{
	$post_data=cp::get_post_data($attr['post']);
	$settings=$post_data['meta'][$meta_name][0]??$default_settings;
}
$hasCounter=preg_match('/\bhas-counter\b/',$settings['classes']);
HTML::render([
	'.wp-block-catpow-progress--.'.str_replace(' ','.',$settings['classes']),
	[
		'ul._items',
		'children'=>array_map(fn($item,$index)=>[
			'li._item'.($attr['step']==$index?'.is-active':''),
			$hasCounter?[
				'._counter',
				!empty($settings['countPrefix'])?['span._prefix',$settings['countPrefix']]:'',
				['span._number',$index+1],
				!empty($settings['countSuffix'])?['span._suffix',$settings['countSuffix']]:'',
			]:'',
			['._label',$item['label']]
		],$settings['items'],range(0,count($settings['items'])-1))
	]
]);