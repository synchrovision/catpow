<?php
namespace Catpow;
$form=form();
if(empty($action)){$action=key($form->contents);}
$content=$form->contents[$action];
$actions=json_decode(htmlspecialchars_decode($content['action']),true);

if(!empty($actions['receive'])){receive();}
if(!empty($actions['push'])){push();}
if(!empty($actions['clear'])){clear($actions['clear']);}
echo apply_filters('the_content',$form->fill_buttons($content['content']));
§message();
deps();