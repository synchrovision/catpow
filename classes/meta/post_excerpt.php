<?php
namespace Catpow\meta;

class post_excerpt extends post_content{
	public static function fill_conf(&$conf){
		$conf['rows']=$conf['rows']??3;
		$conf['cols']=$conf['cols']??50;
	}
}
?>