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
	}
	return $new;
},10,2);
