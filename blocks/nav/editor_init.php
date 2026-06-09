<?php
$data=['input'=>'select','label'=>'メニュー','key'=>'nav_name','values'=>[],'sub'=>[]];
foreach(cp::$config['nav_datas'] as $nav_name=>$nav_conf){
    $label=$nav_conf['label']??$nav_name;
    $data['values'][$nav_name]=$label;
    if(!empty($nav_conf['meta']['icon'])){$data['sub'][$nav_name][]=['label'=>'アイコン','values'=>'hasIcon'];}
    if(!empty($nav_conf['meta']['image'])){$data['sub'][$nav_name][]=['label'=>'画像','values'=>'hasImage'];}
}
wp_localize_script('catpow','navSelectiveClasses',$data);