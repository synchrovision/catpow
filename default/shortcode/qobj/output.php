<?php
namespace Catpow;
$prm=shortcode_atts(array(0=>'name'),$atts);
echo get_queried_object()->{$prm[0]};