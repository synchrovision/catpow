<?php
namespace Catpow\article_type;
/**
* WooCommerceの商品情報
*/

abstract class wc_product extends article_type{
	public static function fill_conf_data(&$conf_data){
		$conf_data['richedit']=$conf_data['richedit']??true;
	}
}

?>