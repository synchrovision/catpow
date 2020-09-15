<?php
namespace Catpow;
$prm=shortcode_atts(array(0=>null,1=>null,2=>null),$atts);
if($prm[0][0]==='{'){$prm[0]=json_decode($prm[0],true);}
if(isset($prm[1][0]) && $prm[1][0]==='{'){$prm[1]=json_decode($prm[1],true);}

input($prm[0],$prm[1],$prm[2]);