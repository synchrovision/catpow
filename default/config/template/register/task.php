<?php 
namespace Catpow;
global $res;
$path='register_form/task-<!--data_name-->';
if(!empty($action) && $action !== 'form'){$path.='/'.$action;}
$post_data=cp::get_post_data($path);
if($post_data['meta']['receive'][0]==1){receive();}
if($post_data['meta']['push'][0]==1){push();}
if(!empty($post_data['meta']['send_mail'])){cp::send_mails($post_data['meta']['send_mail']);}
if(isset($post_data['meta']['clear'])){clear(array_sum($post_data['meta']['clear']));}
content($path);