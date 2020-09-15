<?php
$classname=cp::get_class_name('setup',preg_replace('/[^\w_]/','',$_REQUEST['setup_type']));
$classname::exec();