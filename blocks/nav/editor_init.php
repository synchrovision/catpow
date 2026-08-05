<?php
$data=['input'=>'select','label'=>__('メニュー','catpow'),'key'=>'nav_name','values'=>[],'sub'=>[]];
foreach(cp::$config['nav_datas'] as $nav_name=>$nav_conf){
    $label=$nav_conf['label']??$nav_name;
    $data['values'][$nav_name]=$label;
    if(!empty($nav_conf['meta']['icon'])){$data['sub'][$nav_name][]=['label'=>__('アイコン','catpow'),'values'=>'hasIcon'];}
    if(!empty($nav_conf['meta']['image'])){$data['sub'][$nav_name][]=['label'=>__('画像','catpow'),'values'=>'hasImage'];}
}
wp_localize_script('catpow','navSelectiveClasses',$data);