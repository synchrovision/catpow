<?php
namespace Catpow;;
$editor_deps=CP::get_components_deps([
	'SelectBox',
	'RadioButtons',
	'CheckBoxes',
	'Toggle',
	'SelectMedia',
	'InputDateTime'
]);
return [
	'editor_script'=>$editor_deps['js'],
	'editor_style'=>$editor_deps['css'],
];