<?php
namespace Catpow;
\cp::enqueue_script('<!--path-->/compose/component.js',['wp-element','wp-api-fetch','catpow']);
\cp::enqueue_script('<!--path-->/compose/script.js',['catpow']);
?>
<div
	id="compose"
	data-nonce="<?=wp_create_nonce('wp_rest');?>"
	data-api-path="/cp/v1/<!--path-->/compose/response"
></div>