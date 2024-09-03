<?php
$deps=cp::get_component_deps('Digit');
return [
	'view_script'=>['catpow.component'],
	'style'=>$deps['css'],
	'script'=>$deps['js']
];