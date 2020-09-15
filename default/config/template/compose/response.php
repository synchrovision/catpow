<?php
$result=null; 
//$result=rest_cookie_check_errors($result); 
switch($req['param']){
	case 'init':
		$res->set_data(['myData'=>'place init data here']);
		break;
	case 'myAction':
		$res->set_data(['myData'=>'place resonse data here','count'=>$req['count']+1]);
		break;
}