<?php
/**
 * @package Catpow
 * @version 1.0.0-alpha
 */
/*
Plugin Name: Catpow
Description: オリジナルCMS制作支援フレームワーク。オリジナルCMSの開発のためのWordPress中級者以上向けのプラグインです。PHP7.2〜　Wordpress5.0〜
Author: synchro_vision
Version: 1.1
Author URI: https://twitter.com/synchro_vision
Text Domain: catpow
Domain Path: /languages
*/
include __DIR__.'/vendor/autoload.php';
include __DIR__.'/classes/CP.php';
foreach(cp::$core_functions as $n){include(__DIR__.'/core/'.$n.'.php');}


/*activate deactivate*/
register_activation_hook(__FILE__,function(){include(__DIR__.'/action/activate_catpow.php');});
register_deactivation_hook(__FILE__,function(){include(__DIR__.'/action/deactivate_catpow.php');});

?>