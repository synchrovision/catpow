<?php
namespace Catpow;
$config=MenuManager::get_config_for_menu_component('MegaMenu');
$editor_deps=CP::get_components_deps(array_merge(
	['JsonEditor','Spinner','MegaMenu'],
	array_map(function($editor){return 'JsonEditor/'.$editor;},$config['useEditors']),
	array_keys($config['components'])
));
return [
	'editor_script'=>$editor_deps['js'],
	'editor_style'=>$editor_deps['css'],
];