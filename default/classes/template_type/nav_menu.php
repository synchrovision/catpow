<?php
namespace Catpow\template_type;
/**
* メニュー専用のテンプレート
* $nav_datasのtemplateとしてのみ使用可能
* メニュー全体が編集対象
*/

class nav_menu extends template_type{
	public static $menu_template_type='menu';
}

?>