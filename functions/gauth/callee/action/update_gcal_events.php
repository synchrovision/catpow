<?php
$admin_calendar_id=cp_stock_get('calendar');
$events=cp_stock_get('events');
$admin_access_token=cp_gauth_refresh_token();
$user_access_token=$token->access_token;
$events_datas=array();
foreach($events as $i=>$event_id){
	$event_datas[]=file_get_contents("https://www.googleapis.com/calendar/v3/calendars/{$admin_calendar_id}/events/{$event_id}");
}