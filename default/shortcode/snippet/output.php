<?php
namespace Catpow;
if(empty($atts[0])){
	$file='index.php';
	$args=$atts;
}
else{
	$file=$atts[0].'.php';
	$args=array_slice($atts,1);
}

if(\cp::$content){
	\cp::get_template_part(cp::$content->conf_data_path.'/snippet/'.$file,$args);
}