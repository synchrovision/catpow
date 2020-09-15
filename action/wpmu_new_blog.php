<?php
/*DB setup*/
global $wpdb;
require_once( ABSPATH.'wp-admin/includes/upgrade.php' );
foreach(['view'] as $i=>$meta_type){
	$sql=sprintf('
		CREATE TABLE IF NOT EXISTS %2$s%1$smeta (
		meta_id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
		%1$s_id bigint(20) UNSIGNED NOT NULL DEFAULT 0,
		meta_key varchar(255), 
		meta_value longtext,
		UNIQUE KEY meta_id (meta_id)
		) %3$s;
	',$meta_type,$wpdb->prefix.$blog_id.'_',$wpdb->get_charset_collate());
	dbDelta( $sql );
}


/*default theme setup*/
$theme_name=basename(get_template_directory());
switch_to_blog($blog_id);
update_option('allowedthemes',[$theme_name=>true]);
switch_theme($theme_name);
restore_current_blog();
