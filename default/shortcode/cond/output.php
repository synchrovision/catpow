<?php
namespace Catpow;
$atts=array_map(function($val){return explode(',',$val);},(array)$atts);
if(\cp::$content->form){
	echo json_encode(\cp::$content->form->get_refine_cond_value($atts));
}
else{echo json_encode($atts);}