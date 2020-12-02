<?php
namespace Catpow;
$res->set_data([
	'html'=>apply_filters('the_content',get_post($req['data_id'])->post_content),
	'deps'=>util\wp::get_deps()
]);