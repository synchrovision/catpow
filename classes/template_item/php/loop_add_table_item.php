<?php
namespace Catpow\template_item\php;
/**
* テンプレートファイルで使用される要素
*/

class loop_add_table_item extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$metas=$conf_data['meta']?:null;
		if(is_null($metas)){return false;}
		$rtn=['',['td.controle[colspan="'.(count($metas)+1).'"]','@button ss.center plus:追加:create:insert']];
		return $rtn;
	}
}

?>