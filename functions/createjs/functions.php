<?php

function use_createjs($uses=false){
	wp_enqueue_script('createjs',"https://code.createjs.com/createjs-2015.11.26.min.js");
	foreach((array)$uses as $i=>$use){
		wp_enqueue_script('cp_createjs_'.basename($use),plugins_url().'/catpow/lib/cp_createjs/'.$use.'.js',['createjs']);
	}
}