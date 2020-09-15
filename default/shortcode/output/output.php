<?php
namespace Catpow;
$prm=shortcode_atts(array(0=>null,1=>null,2=>null),$atts);
if(isset($prm[1][0]) && $prm[1][0]==='{'){$prm[1]=json_decode($prm[1],true);}

output($prm[0],$prm[1],$prm[2]);