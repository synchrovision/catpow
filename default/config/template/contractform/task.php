<?php
namespace Catpow;
$path=this()->post_data_path;
if(!empty($action) && $action !== 'task'){$path.='/'.$action;}
elseif(!empty(this()->param['action'])){$path.='/'.this()->param['action'];}
$post_data=cp::get_post_data($path);
if(($post_data['meta']['receive'][0]??null)==1){receive();}
if(($post_data['meta']['push'][0]??null)==1){push();}
if(!empty($post_data['meta']['create_task'])){task(null,$post_data['meta']['create_task']);}
if(!empty($post_data['meta']['send_mail'])){cp::send_mails($post_data['meta']['send_mail']);}
if(isset($post_data['meta']['clear'])){clear(array_sum($post_data['meta']['clear']));}
content($path);
§message();
deps();