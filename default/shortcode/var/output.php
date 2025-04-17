<?php
namespace Catpow;
$prm=shortcode_atts([0=>'text'],$atts);
echo CP::$vars[$prm[0]];