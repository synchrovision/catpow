<?php
add_filter('wp_sitemaps_users_pre_url_list',function(){return [];});
add_filter('wp_sitemaps_users_pre_max_num_pages',function(){return 0;});
add_filter('author_rewrite_rules',function(){return [];});
add_filter('query_vars',function($vars){return array_diff($vars,['author','author_name']);});
add_filter('rest_prepare_user',function(){return new WP_REST_Response(['message'=>__('無効なリクエストです','catpow')],404);});