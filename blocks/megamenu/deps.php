<?php
namespace Catpow;
$editor_deps=CP::get_components_deps(array_merge(
	['JsonEditor','Spinner','MegaMenu'],
	array_keys(MenuManager::get_all_components_for_menu_component('MegaMenu'))
));
return [
	'editor_script'=>$editor_deps['js'],
	'editor_style'=>$editor_deps['css'],
];