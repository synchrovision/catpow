<?php
namespace Catpow;
$prm=shortcode_atts(array(0=>'name'),$atts);
echo \cp::$content->object->{$prm[0]};