<?php
namespace Catpow;

class setup{
	public static function exec(){
		setup\template::exec();
		setup\posts::exec();
		setup\menu::exec();
		setup\role::exec();
		setup\database::exec();
	}
	public static function update_last_setup_time(){
		update_option('catpow_last_setup_time',self::get_system_config_filemtime());
	}
	public static function get_system_config_filemtime(){
		$system_config_file=\cp::get_file_path('config/system_config.php',\cp::FROM_THEME);
		return filemtime($system_config_file);
	}
	public static function has_update(){
		return get_option('catpow_last_setup_time',0)==self::get_system_config_filemtime();
	}
}