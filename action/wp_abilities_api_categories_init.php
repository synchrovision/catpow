<?php
$ability_dirs=[];
foreach(cp::glob('classes/Ability/*.php') as $f){
    $name=substr(basename($f),0,-4);
    $slug=strtolower(preg_replace('/([a-z])([A-Z])/','$1-$2',$name));
    $class_name=cp::get_class_name('Ability',$name);
    wp_register_ability_category($slug,[
        'label'=>$class_name::$label,
        'description'=>$class_name::$description,
        'meta'=>$class_name::$meta,
    ]);
}