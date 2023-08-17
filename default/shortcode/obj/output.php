<?php
namespace Catpow;
$prm=shortcode_atts(array(0=>'name'),$atts);

switch($prm[0]){
	case 'url':echo \cp::$content->get_the_url();break;
	case 'href':$ulr=\cp::$content->get_the_url();echo substr($url,strpos($url,'://')+3);break;
	default:echo \cp::$content->object->{$prm[0]};
}
