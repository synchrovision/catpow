<?php
namespace Catpow\template_item\php;
/**
* テンプレートファイルで使用される要素
*/

class outputs extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		if(empty($conf_data['meta'])){return false;}
		if(empty($param[0]) || $param[0]==='table'){
			$rtn=['tag'=>'table.inputs'];
			foreach($conf_data['meta'] as $name=>$conf){
				$class_name=\cp::get_class_name('meta',$conf['type']);
				if(!$class_name::$has_parent && !($param&1)){continue;}
				if(isset($conf['alias']) && !($param&2)){continue;}
				if($class_name::$has_children && !$class_name::$is_bulk_output && !$class_name::$is_unit_output){$output=static::get_table_code_data($conf,$param);}
				else{$output='<?php output(\''.$name.'\'); ?>';}
				$rtn[$name]=['tr.row',
					['th.th',$conf['label']],
					['td.td',$output]
				];
			};
			return $rtn;
		}
		if($param[0]==='plain'){
			$rtn=[''];
			foreach($conf_data['meta'] as $name=>$conf){
				$class_name=\cp::get_class_name('meta',$conf['type']);
				if(!$class_name::$has_parent && !($param&1)){continue;}
				if(isset($conf['alias']) && !($param&2)){continue;}
				if($class_name::$has_children && !$class_name::$is_bulk_output){
					$rtn[]=$conf['label'];
					$rtn[]=static::get_plain_code_data($conf,$param);
				}
				else{
					$rtn[]=$conf['label'].' ：　<?php output(\''.$name.'\'); ?> ';
				}
			};
			return $rtn;
		}
	}
	public static function get_table_code_data($conf_data,$param){
		$table=['tag'=>'table.inputs'];
		foreach($conf_data['meta'] as $name=>$conf){
			$class_name=\cp::get_class_name('meta',$conf['type']);
			if(!$class_name::$has_parent && !($param&1)){continue;}
			if(isset($conf['alias']) && !($param&2)){continue;}
			if($class_name::$has_children && !$class_name::$is_unit_output){$output=static::get_table_code_data($conf);}
			else{$output='<?php output(\''.$name.'\'); ?>';}
			$table[$name]=['tr.row',
				['th.th',$conf['label']],
				['td.td',$output]
			];
		};
		return ['',
			'<?php «(\''.$conf_data['name'].'\'); ?>',
			'<?php foreach(loop() as $'.$conf_data['name'].'): ?>',
			$table,
			'<?php endforeach; ?>',
			'<?php »(); ?>'
		];
	}
	public static function get_plain_code_data($conf_data,$param){
		$rtn=[''];
		$rtn[]='<?php «(\''.$conf_data['name'].'\'); ?>';
		$rtn[]='<?php foreach(loop() as $'.$conf_data['name'].'): ?>';
		foreach($conf_data['meta'] as $name=>$conf){
			$class_name=\cp::get_class_name('meta',$conf['type']);
			if(!$class_name::$has_parent && !($param&1)){continue;}
			if(isset($conf['alias']) && !($param&2)){continue;}
			if($class_name::$has_children){
				$rtn[]=$conf['label'];
				$rtn[]=static::get_plain_code_data($conf);
			}
			else{
				$rtn[]=$conf['label'].' ：　<?php output(\''.$name.'\'); ?> ';
			}
		};
		$rtn[]='<?php endforeach; ?>';
		$rtn[]='<?php »(); ?>';
		return $rtn;
	}
}

?>