<?php
namespace Catpow\template_item\php;
/**
* テンプレートファイルで使用される要素
*/

class inputs_search extends inputs{
	public static function get_code_data($path_data,$conf_data,$param){
		if($path_data['data_type']==='cpdb'){
			if(empty($conf_data['meta'])){return [];}
			$metas=$conf_data['meta'];
		}
		else{
			if(empty($conf_data['meta'])){return [];}
			$metas=$conf_data['meta'];
		}
		$rtn=['table.inputs'];
		$rtn=array_merge($rtn,self::get_search_input_table_rows($metas));
		return $rtn;
	}
	public static function get_search_input_table_rows($metas){
		$rtn=[];
		foreach($metas as $name=>$conf){
			$class_name=\cp::get_class_name('meta',$conf['type']);
			if(!class_exists($class_name) || !$class_name::$can_search){continue;}
			if($class_name::$has_children){
				$rtn[]="<?php foreach(loop('{$name}') as \$val): ?>";
				$rtn=array_merge($rtn,self::get_search_input_table_rows($conf['meta']));
				$rtn[]="<?php endforeach; ?>";
			}
			elseif(preg_match('/^(select|radio)/',$conf['type'])){
				$type=preg_replace('/^(select|radio)/','checkbox',$conf['type']);
				$rtn[]=['tr',
					['th',$conf['label']],
					['td',['ul.inputs',['li',"<?php meta('{$name}')->mod('{$type}')->input(); ?>"]]]
				];
			}
			else{
				$rtn[]=['tr',
					['th',$conf['label']],
					['td',['ul.inputs',['li','<?php input(\''.$name.'\'); ?>']]]
				];
			}
		};
		return $rtn;
	}
}

?>