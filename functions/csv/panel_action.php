<?php
namespace Catpow;
if($_REQUEST['csv_action']==='upload'){
	if(empty($_FILES['csv']['tmp_name'])){
		echo 'ファイルが選択されていません';
	}
	else{
		$csv=new CSV($_FILES['csv']['tmp_name']);
		foreach($csv->collect('data_type') as $data_type=>$datas){
			$query_class=\cp::get_class_name('query',$data_type);
			foreach($datas as $r=>$row){
				foreach($row as $c=>$val){
					if($v=json_decode($val,true)){$datas[$r][$c]=$v;}
				}
			}
			$query_class::import($datas);
		}
	}
}
elseif($_REQUEST['csv_action']==='download'){
	receive();
	$conf_data_path=value('conf_data_path');
	$path_data=cp::parse_conf_data_path($conf_data_path);
	global $res;
	$res['type']='text/csv';
	$res['name']=$path_data['data_name'].'.csv';
	$query_class=\cp::get_class_name('query',$path_data['data_type']);
	$q=new $query_class(['data_name'=>$path_data['data_name'],'limit'=>false]);
	$data=$q->export();
	array_walk($data,function(&$row){
		foreach($row as &$val){
			if(is_array($val)){$val=json_encode($val,0500);}
		}
	});
	array_unshift($data,array_keys($data[0]));
	$csv=new CSV($data);
	$csv->output();
}