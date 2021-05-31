<?php
namespace Catpow;
$prm=shortcode_atts(array(0=>'url',1=>false),$atts);
$task=task($prm[1]);
if(empty($task)){return;}
switch($prm[0]){
	case 'url':echo $task->get_url();break;
	case 'id':echo $task->get_task_id();break;
	case 'beacon':$task->beacon($atts['count']??$atts['flag']??'beacon',(empty($atts['count'])?0:1)&(empty($atts['unlimited'])?0:2));break;
}
$task->save();
