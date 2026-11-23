<?php
namespace Catpow\template_type;
/**
* メニュー専用のテンプレート
* $nav_datasのtemplateとしてのみ使用可能
* メニューのタイトル部分のみ編集対象
*/

class menu_item extends template_type{
	public static $menu_template_type='menu_item';
	public static function fill_conf_data(&$conf_data){
		$conf_data['meta']['alt']=['type'=>'text'];
		$conf_data['meta']['icon']=['type'=>'SelectEmbedIcon'];
		$conf_data['meta']['color']=['type'=>'SelectPostColor'];
	}
}

?>