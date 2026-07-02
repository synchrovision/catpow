<?php
chdir(__DIR__);
$str=file_get_contents('icon_names.txt');
$names=array_filter(explode("\n",$str));
file_put_contents('materiaIconNames.json',json_encode($names,0700));