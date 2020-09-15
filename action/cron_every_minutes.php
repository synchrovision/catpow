<?php
if($cron_file=cp::get_file_path('cron_every_minutes.php',2)){include($cron_file);}

global $cpdb;
if(!empty($cpdb->functional['cron'])){
	foreach($cpdb->functional['cron'] as $table_name=>$table_data){
		$rows=$cpdb->select($table_name,['datetime'=>['<='=>date('Y-m-d H:i:s')],'done'=>-1]);
		if(empty($rows)){continue;}
		$conf=cp::get_conf_data($table_data['path']);
		$class_name=cp::get_class_name('meta',$table_data['type']);
		foreach($rows as &$row){
			$class_name::cron($conf,$row);
			if(empty($row['interval'][0]) || $row['interval'][0]=='once'){
				$row['done'][0]=1;
			}
			else{
				$interval=$row['interval'][0];
				if(is_numeric($interval)){$interval=absint($interval).' seconds';}
				$row['datetime'][0]=date('Y-m-d H:i:s',strtotime($row['datetime'][0].' + '.$interval));
			}
		}
		$cpdb->update($table_name,$rows);
	}
}