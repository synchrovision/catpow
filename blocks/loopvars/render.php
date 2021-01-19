<?php
$id=uniqid();
$GLOBALS['loop_block_data'][$id]=[
	'values'=>$attr['items'],
	'content'=>'<div class="wp-block-catpow-loopvars [var classes]">'.$content.'</div>'
];
echo "[loop_block {$id}]";