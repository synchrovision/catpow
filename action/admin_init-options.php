<?php
namespace Catpow;

add_filter('pre_update_option_siteurl',function($new,$old){
	if($new !== $old){
		global $wpdb;
		$wpdb->query("
			UPDATE $wpdb->posts SET
			post_content = REPLACE( post_content, \"$old\", \"$new\" ),
			guid = REPLACE( guid, \"$old\", \"$new\" )
		");
		$wpdb->query("
			UPDATE $wpdb->options SET
			option_value = REPLACE( option_value, \"$old\", \"$new\" )
		");
	}
	return $new;
},10,2);
