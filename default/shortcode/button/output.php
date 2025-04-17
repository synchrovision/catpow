<?php
namespace Catpow;
if(empty($content)){
	$prm=shortcode_atts([
		0=>'送信',
		1=>false,
		'param'=>null,
		'target'=>null,
		'ignore_message'=>null
	],$atts);
	$content=$prm[0];
	$action=$prm[1];
}
else{
	$prm=shortcode_atts([
		0=>false,
		'param'=>null,
		'target'=>null,
		'ignore_message'=>null
	],$atts);
	$action=$prm[0];
}
if(isset($prm['param'])){$prm['param']=json_decode($prm['param']);}

if(!is_null(\cp::$content->form??null)){
	\cp::$content->form->button($content,$action,$prm['param'],$prm['target'],$prm['ignore_message']);
}
else{
	echo '<a class="cpsc-button" href="'.$action.'">'.$content.'</a>';
}
