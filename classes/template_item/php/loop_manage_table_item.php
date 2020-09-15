<?php
namespace Catpow\template_item\php;
/**
* テンプレートファイルで使用される要素
*/

class loop_manage_table_item extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$metas=$conf_data['meta']?:null;
		if(is_null($metas)){return false;}
		$rtn=[
			'',
			[
				'th.control',
				'@button ss edit:編集:edit:lightbox',
				'<?php §lightbox(); ?>'
			]
		];
		foreach($metas as $name=>$conf){
			$class_name=\cp::get_class_name('meta',$conf['type']);
			if(!class_exists($class_name) || !$class_name::$has_parent){continue;}
			if(isset($conf['alias'])){continue;}
			$rtn[]=['td',"<?php output('{$name}'); ?>"];
		}
		return $rtn;
	}
}

?>