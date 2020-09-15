<?php
namespace Catpow\template_item\php;
/**
* テンプレートファイルで使用される要素
*/

class input_search extends inputs{
	public static function get_code_data($path_data,$conf_data,$param){
		$name=$param[0];
		$conf=$conf_data['meta'][$name];
		$class_name=\cp::get_class_name('meta',$conf['type']);
		if(!class_exists($class_name) || !$class_name::$can_search){return '';}
		if($class_name::$has_children){
			$rtn=['table.inputs'];
			$rtn[]="<?php foreach(loop('{$name}') as \$val): ?>";
			$rtn=array_merge($rtn,inputs_search::get_search_input_table_rows($conf['meta']));
			$rtn[]="<?php endforeach; ?>";
			return $rtn;
		}
		if(preg_match('/^(select|radio)/',$conf['type'])){
			$type=preg_replace('/^(select|radio)/','checkbox',$conf['type']);
			return "<?php meta('{$name}')->mod('{$type}')->input(); ?>";
		}
		if($class_name::$can_search_with_range){
			return [
				'',
				'<?php input(\''.$name.'/0\'); ?>〜<?php input(\''.$name.'/1\'); ?>',
				'<?php compare(\''.$name.'\',\'between\'); ?>'
			];
		}
		return '<?php input(\''.$name.'\'); ?>';
	}
}

?>