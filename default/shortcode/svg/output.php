<?php
namespace Catpow;
$prm=shortcode_atts([0=>'',1=>'color1'],$atts);
$name=$prm[0];
\cp::enqueue_script('shortcode/svg/'.$name.'/script.js',['catpow']);
\cp::enqueue_style('shortcode/svg/'.$name.'/style.css');