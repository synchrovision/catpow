<?php

if(!file_exists(__DIR__.'/vendor')){
	require_once(ABSPATH.'/wp-admin/includes/file.php');
	WP_Filesystem();;
	unzip_file( __DIR__.'/vendor.zip', __DIR__);
}

include(__DIR__.'/vendor/autoload.php');