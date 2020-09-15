<?php
$conf=[
	'cat'=>'manage',
	'meta'=>[
		'conf_data_path'=>['type'=>'select','value'=>function(){
			$sels=[];
			\cp::conf_data_walk(function($data_type,$data_name,$conf)use(&$sels){
				if(in_array($data_type,['page'],true)){return;}
				if(isset($conf['alias_path'])){$sels[$data_type][$conf['label']]=$conf['alias_path'];}
				else{$sels[$data_type][$conf['label']]=$conf['path'];}
			});
			return $sels;
		}],
	]
];