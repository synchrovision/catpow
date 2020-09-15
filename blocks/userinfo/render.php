<?php
if(is_user_logged_in()){
	foreach(cp::$content->user()->loop() as $user){
		echo do_shortcode($content);
	}
}
else{
	wp_login_form();
}