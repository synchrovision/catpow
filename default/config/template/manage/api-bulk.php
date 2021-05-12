<?php
namespace Catpow;
$conf=cp::get_conf_data('<!--data_type-->/<!--data_name-->');
$actions=[
	'delete'=>[
		'label'=>'削除',
		'callback'=>function($rows){
			$GLOBALS['cpdb']->delete('<!--data_name-->',['meta_id'=>$rows]);
			return ['remove'=>true,'message'=>sprintf(_('%d件を削除しました'),count($rows))];
		}
	],
	'download'=>[
		'label'=>'ダウンロード',
		'callback'=>function($rows){
			
			$data=[];
			$cols=cp::get_conf_data('<!--data_type-->/<!--data_name-->')['meta'];

			$row=[];
			foreach($cols as $name=>$col){
				$row[]=$col['label'];
			}
			$data[]=$row;
			foreach(loop('<!--data_type-->/<!--data_name-->',['where'=>['meta_id'=>$rows]]) as $id=>$obj){
				$row=[];
				foreach($cols as $name=>$col){
					$row[]=strip_tags(meta($name)->get_output());
				}
				$data[]=$row;
			}
			$csv=new CSV($data);
			$csv->flatten();
			return [
				'download'=>[
					'name'=>'<!--data_name-->',
					'data'=>$csv->get_output()
				]
			];
		}
	]
];
if(isset($conf['meta']['status'])){
	$actions['update_status']=[
		'label'=>'ステータスを更新',
		'inputs'=>[
			['type'=>'RadioButtons','name'=>'status','options'=>$conf['meta']['status']['value']]
		],
		'callback'=>function($rows,$vals){
			$status=$vals['status']??0;
			$GLOBALS['cpdb']->update('<!--data_name-->',array_map(function($row)use($status){
				return ['meta_id'=>$row,'status'=>$status];
			},$rows));
			return [
				'update'=>array_map(function($row)use($status){return ['_id'=>$row,'status'=>['value'=>[$status]]];},$rows),
				'message'=>sprintf(_('%d件のステータスを更新しました'),count($rows))
			];
		}
	];
}
	
if($req['param']==='index'){
	$index=[];
	$tmpl=array_flip(['label','inputs']);
	foreach($actions as $name=>$conf){
		$index[$name]=array_intersect_key($conf,$tmpl);
	}
	$res->set_data($index);
	return;
}
$param=explode('/',$req['param']);
if($param[0]==='exec'){
	$res->set_data($actions[$param[1]]['callback']($req['rows'],$req['vals']));
}