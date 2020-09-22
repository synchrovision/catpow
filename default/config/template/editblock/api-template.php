<?php
$meta=cp::get_conf_data($req['data_type'].'/'.$req['data_name'])['meta']??[];
$res->set_data([
	['catpow/formblockcontent',['name'=>'view'],[
		['catpow/simpletable',['rows'=>array_map(function($item){
			return ['cells'=>[
				['text'=>[$item['label']]],
				['text'=>['[output '.$item['name'].']']]
			]];
		},array_values($meta))]],
		['catpow/formbuttons',['items'=>[
			['classes'=>'item','text'=>'編集','action'=>'edit']
		]]]
	]],
	['catpow/formblockcontent',['name'=>'edit'],[
		['catpow/simpletable',['rows'=>array_map(function($item){
			return ['cells'=>[
				['text'=>[$item['label']]],
				['text'=>['[input '.$item['name'].']']]
			]];
		},array_values($meta))]],
		['catpow/formbuttons',['items'=>[
			['classes'=>'item','text'=>'更新','action'=>'view']
		]]]
	]]
]);