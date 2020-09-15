<?php
namespace Catpow\template_item\php;
/**
* テンプレートファイルで使用される要素
*/

class loop_manage_table extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		$metas=$conf_data['meta']?:null;
		if(is_null($metas)){return false;}
		$rtn=[
			'table.manage',
			'thead'=>[
				'thead',
				'tr'=>['tr',['th.control',"<?=__('操作','catpow')?>"]]
			],
			'tbody'=>[
				'tbody',
				"<?php foreach(loop() as \$id=>\$obj){§sec('manage_item@tr',\$id);} ?>",
				"<?php §sec('manage_item-add@tr'); ?>"
			]
		];
		foreach($metas as $name=>$conf){
			$class_name=\cp::get_class_name('meta',$conf['type']);
			if(!class_exists($class_name) || !$class_name::$has_parent){continue;}
			if(isset($conf['alias'])){continue;}
			$rtn['thead']['tr'][]=['th',$conf['label']];
		}
		return ['div.table_wrapper',$rtn];
	}
}

?>