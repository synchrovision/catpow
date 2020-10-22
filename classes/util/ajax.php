<?php
/**
* WPのAjaxのメソッド
*/
namespace Catpow\util;
class ajax{
	function create_url($action,$prm=null){
		$prm=(array)$prm;
		$prm['action']=$action;
		return sprintf('%s?%s',admin_url().'/admin-ajax.php',http_build_query($prm));
	}
}

?>