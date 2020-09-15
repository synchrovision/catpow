<?php
namespace Catpow;
\cp::enqueue_script('<!--path-->/finder/component.js',['wp-element','babelHelpers','wp-api-fetch','catpow']);
\cp::enqueue_script('<!--path-->/finder/script.js',['catpow']);
?>
<div id="finder"></div>