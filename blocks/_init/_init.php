<?php
$data=[];
\cp::conf_data_walk(function($data_type,$data_name,$conf_data)use(&$data){
	if($data_type==='nav'){return false;}
	$pref=($data_type=='cpdb')?'alias_':'';
	foreach(['','alias_'] as $pref){
		if(empty($conf_data[$pref.'template'])){continue;}
		foreach($conf_data[$pref.'template'] as $template){
			$template_data=explode('-',$template);
			$class_name=cp::get_class_name('template_type',$template_data[0]);
			$embeddables=$class_name::get_embeddables($conf_data);
			foreach($embeddables as $embed_type=>$embeddable){
				if(empty($data[$embed_type][$conf_data['label']])){
					$data[$embed_type][$conf_data['label']]=[
						'name'=>$conf_data['label'],
						'id'=>'null',
						'children'=>[]
					];
				}
				foreach($embeddable as $label=>$item){
					if(is_array($item)){
						$item['name']=$label.(isset($template_data[1])?'('.$template_data[1].')':'');
						if(isset($item['file'])){$item['id']=$conf_data[$pref.'path'].'/'.$template.'/'.$item['file'];}
						$data[$embed_type][$conf_data['label']]['children'][]=$item;
					}
					else{
						$data[$embed_type][$conf_data['label']]['children'][]=[
							'name'=>$label.(isset($template_data[1])?'('.$template_data[1].')':''),
							'id'=>$conf_data[$pref.'path'].'/'.$template.'/'.$item
						];
					}
				}
			}
		}
	}
});
$data['widget']['none']=[
	'name'=>'ブロックを選択',
	'id'=>'',
	'conf'=>[],
];
foreach(cp::$use_functions as $func){
	if($f=\cp::get_file_path('functions/'.$func.'/block.php')){
		include_once($f);
		$class_name='\\Catpow\\blocks\\'.$func;
		$data['widget'][$func]=[
			'name'=>$class_name::$label,
			'id'=>$func,
			'conf'=>$class_name::get_conf()
		];
	}
}
wp_localize_script('catpow','cpEmbeddablesTree',$data);
Catpow\api\blocks\config::register_nonce();