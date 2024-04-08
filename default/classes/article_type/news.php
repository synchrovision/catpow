<?php
namespace Catpow\article_type;
/**
* 記事タイプ
*/

abstract class news extends article_type{
	public static function fill_conf_data(&$conf_data){
		if(empty($conf_data['template'])){
			$conf_data['template']=['news','archive'];
		}
		else if(in_array('news',$conf_data['template'])){
			$conf_data['template'][]='news';
		}
	}
}

?>