<?php
/*
Plugin Name: Catpow
Description: サイト固有の機能を実装したオリジナルデザインのテーマを開発するためのプラグインです。
Author: synchro_vision
Version: 0.4.0-alpha
Author URI: https://catpow.info
Text Domain: catpow
Domain Path: /languages
Update URI: https://github.com/synchrovision/catpow
Requires at least: 6.1
Requires PHP: 7.4
*/
include __DIR__.'/vendor/autoload.php';
include __DIR__.'/classes/CP.php';
class_alias(Catpow\CP::class,'cp');
foreach(cp::$core_functions as $n){include(__DIR__.'/core/'.$n.'.php');}


/*activate deactivate*/
register_activation_hook(__FILE__,function(){include(__DIR__.'/action/activate_catpow.php');});
register_deactivation_hook(__FILE__,function(){include(__DIR__.'/action/deactivate_catpow.php');});

?>