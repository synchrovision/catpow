<?php
namespace Catpow;
$prm=shortcode_atts(array(0=>null),$atts);
echo implode(',',values($prm[0]));