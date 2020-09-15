<?php
namespace Catpow;
$prm=shortcode_atts(array(0=>3),$atts);
printf('<span class="star"><span class="value" style="width:%s%%;"></span></span>',$prm[0]*20);