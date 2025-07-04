<?php
\cp::use_components(['JsonEditor','JsonEditor/Image']);

$data=[];
\cp::conf_data_walk(function($data_type,$data_name,$conf_data)use(&$data){
	if($data_type==='nav'){return false;}
	$pref=($data_type=='cpdb')?'alias_':'';
	foreach(['','alias_'] as $pref){
		if(empty($conf_data[$pref.'template'])){continue;}
		foreach($conf_data[$pref.'template'] as $template){
			$template_data=explode('-',$template);
			$class_name=cp::get_class_name('template_type',$template_data[0]);
			if(!class_exists($class_name)){continue;}
			$path="{$conf_data[$pref.'path']}/{$template}";
			$embeddables=$class_name::get_embeddables($path,$conf_data);
			if(empty($embeddables)){continue;}
			Catpow\api::register_nonce($path);
			$deps=[
				'css'=>cp::get_file_url("{$path}/style.css",cp::FROM_THEME|cp::FROM_CONFIG),
				'script'=>cp::get_file_url("{$path}/script.js",cp::FROM_THEME|cp::FROM_CONFIG)
			];
			$has_config=!empty(cp::get_file_path("{$path}/api-config.php",cp::FROM_THEME|cp::FROM_CONFIG));
			$has_template=!empty(cp::get_file_path("{$path}/api-template.php",cp::FROM_THEME|cp::FROM_CONFIG));
			foreach($embeddables as $embed_type=>$embeddable){
				if(empty($data[$embed_type][$conf_data['label']])){
					$data[$embed_type][$conf_data['label']]=[
						'name'=>$conf_data['label'],
						'id'=>'null',
						'children'=>[]
					];
				}
				foreach($embeddable as $label=>$item){
					if(!is_array($item)){$item=['id'=>$path.'/'.$item];}
					if(isset($item['file'])){$item['id']=$path.'/'.$item['file'];}
					$item['name']=$label.(isset($template_data[1])?'('.$template_data[1].')':'');
					$data[$embed_type][$conf_data['label']]['children'][]=array_merge($item,compact('deps','has_config','has_template'));
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
	$class_name=cp::get_class_name($func,'Widget');
	if(class_exists($class_name)){
		$data['widget'][$func]=[
			'name'=>$class_name::$label,
			'id'=>$func,
			'conf'=>Catpow\util\BlockConfig::initAsJsonAttribute($class_name::get_conf(),'param')
		];
	}
}
wp_localize_script('catpow','cpEmbeddablesTree',$data);
Catpow\api\blocks\config::register_nonce();