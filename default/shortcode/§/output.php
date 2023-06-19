<?php
namespace Catpow;
$prm=shortcode_atts(array(0=>false,1=>null),$atts);

if(!is_null(form())){
	if(empty($content)){
		form()->div($prm[0],$prm[1]);
	}
	else{
		form()->div($prm[0],shortcode::do_shortcode(do_shortcode($content)));
	}
}
