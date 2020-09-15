<?php
/*DB setup*/
global $wpdb;
$wpdb->query(sprintf('DROP TABLE IF EXISTS %1$stalks;',$wpdb->prefix));
$wpdb->query(sprintf('DROP TABLE IF EXISTS %1$stalklog;',$wpdb->prefix));
$wpdb->query(sprintf('DROP TABLE IF EXISTS %1$stoken;',$wpdb->prefix));
$wpdb->query(sprintf('DROP TABLE IF EXISTS %1$stalker;',$wpdb->prefix));
foreach(['term','view','talk','talker','talklog'] as $i=>$meta_type){
	$wpdb->query(sprintf('DROP TABLE IF EXISTS %2$s%1$smeta;',$meta_type,$wpdb->prefix));
}

include(dirname(dirname(dirname(__FILE__))).'/conf/gen.php');