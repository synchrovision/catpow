<?php
$config_json=cp::get_file_path($req['path'].'/config.json',cp::FROM_THEME|cp::FROM_CONFIG);
$config=json_decode(file_get_contents($config_json),true);
$options=$config['options']??[];
$res->set_data($options);