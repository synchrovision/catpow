<?php


function cp_gcal_refresh_token(){
	$options = array('http' => array(
		'method' => 'POST',
		'content' => http_build_query([
			'grant_type' => 'refresh_token',
			'redirect_uri' => home_url().'/wp-content/plugins/catpow/lib/gauth/oauth_callback.php',
			'client_id' => get_option('cp_gauth_crient_id'),
			'client_secret' => get_option('cp_gauth_crient_secret'),
			'refresh_token'=>get_option('cp_gcal_refresh_token')
		])
	));
	$token = json_decode(file_get_contents('https://accounts.google.com/o/oauth2/token', false, stream_context_create($options)));
	update_option('cp_gcal_access_token',$token->access_token);
}
function cp_gcal_get_holiday(){
	return json_decode(file_get_contents(
		'https://www.googleapis.com/calendar/v3/calendars/'
		.urlencode('japanese__ja@holiday.calendar.google.com').'/events?'
		.http_build_query(['access_token'=>get_option('cp_gcal_access_token')])
	));
}

function cp_gcal_copy_meta_events_button($type,$name,$text='マイカレンダーにコピー'){
	$meta=cp_get_meta($type,$name);
	cp_gauth_button($text,'update_gcal_events','https://www.googleapis.com/auth/calendar',[
		'calendar'=>$meta['calendar'],
		'events'=>cp_get_meta_value($type,$name)
	]);
}

add_action('cp_after_update_meta_gcal_event',function($post_id,$key,$meta){
},10,3);