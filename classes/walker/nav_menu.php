<?php
namespace Catpow\walker;
class nav_menu extends \Walker_Nav_Menu {
	public $template;
	public function __construct($template='nav_menu'){
		$this->template=$template;
	}
	public function walk($menu_items,$max_depth,...$args){
		$template_class_name=\cp::get_class_name('template_type',$this->template);
		switch($template_class_name::$menu_template_type){
			case 'menu_item':
				return call_user_func_array([parent::class,'walk'],func_get_args());
			case 'menu':
				return \Catpow\loop("nav/{$args[0]->theme_location}/{$this->template}/loop.php");
			case 'component':
				return \Catpow\loop("nav/{$args[0]->theme_location}/{$this->template}/render.php");
		}
	}
}
