<?php
namespace Catpow\template_item\php;
/**
* テンプレートファイルで使用される要素
*/

class menu extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		if(empty($param)){$param=array(key(\cp::$config['nav_datas']));}
		if(!isset(\cp::$config['nav_datas'][$param[0]])){return false;}
		return "<?php menu('{$param[0]}'); ?>";
	}
}

?>