<?php
namespace Catpow;
$prm=shortcode_atts([0=>'text'],$atts);
echo cp::$vars[$prm[0]];