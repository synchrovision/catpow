<?php
/*
Plugin Name: Catpow
Description: オリジナルCMS制作支援フレームワーク。オリジナルCMSの開発のためのWordPress中級者以上向けのプラグインです。PHP7.2〜　Wordpress5.0〜
Author: synchro_vision
Version: 0.3.3-alpha
Author URI: https://twitter.com/synchro_vision
Text Domain: catpow
Domain Path: /languages
GitHub Repository: synchrovision/catpow
Requires at least: 5.6
Requires PHP: 7.4
*/
include __DIR__.'/vendor/autoload.php';
include __DIR__.'/classes/CP.php';
foreach(cp::$core_functions as $n){include(__DIR__.'/core/'.$n.'.php');}


/*activate deactivate*/
register_activation_hook(__FILE__,function(){include(__DIR__.'/action/activate_catpow.php');});
register_deactivation_hook(__FILE__,function(){include(__DIR__.'/action/deactivate_catpow.php');});

?>