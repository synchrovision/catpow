<?php
namespace Catpow;
$prm=shortcode_atts(['src'=>''],$atts);
echo file_get_contents($prm['src']);