<?php
$attributes=[
	'classes'=>['source'=>'attribute','selector'=>'.wp-block-catpow-countdown','attribute'=>'class','default'=>'wp-block-catpow-countdown'],
	'vars'=>['type'=>'object'],
	'target'=>['type'=>'string','source'=>'attribute','selector'=>'.wp-block-catpow-countdown','attribute'=>'data-target','default'=>date('Y-m-d H:i:s',strtotime('+ 7 day'))]
];