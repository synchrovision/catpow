<?php
namespace Catpow;
$prm=shortcode_atts(array(0=>false),$atts);
if(strpos($prm[0],'/')===false){$arg=null;}
else{$arg=array_slice($atts,1);}

if(cp::$content){
	if(empty($content)){
		loop($prm[0],$arg);
	}
	else{
		foreach(loop($prm[0],$arg) as $obj){
			echo shortcode::do_shortcode(do_shortcode($content));
		}
	}
}