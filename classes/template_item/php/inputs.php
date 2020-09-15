<?php
namespace Catpow\template_item\php;
/**
* 入力項目のテーブルを表示
* param
* 1:共有値の入力を表示(!$has_parent)
* 2:DB入力を表示($is_database)
* 4:
*/

class inputs extends \Catpow\template_item\php{
	public static function get_code_data($path_data,$conf_data,$param){
		if(empty($conf_data['meta'])){return false;}
		$param=(int)reset($param);
		$rtn=['table.wp-block-catpow-simpletable.inputs'];
		foreach($conf_data['meta'] as $name=>$conf){
			$class_name=\cp::get_class_name('meta',$conf['type']);
			if(!class_exists($class_name)){continue;}
			if(!$class_name::$has_parent && !($param&1)){continue;}
			if($class_name::$is_database && !($param&2)){continue;}
			if($class_name::$has_children && !$class_name::$is_bulk_input && !$class_name::$is_unit_input){$input=static::get_table_code_data($conf,$param);}
			else{$input='<?php input(\''.$name.'\'); ?>';}
			$rtn[]=[!empty($conf['required'])?'tr.required':'tr',
				['th',$conf['label']],
				['td',$input]
			];
		};
		return $rtn;
	}
	public static function get_table_code_data($conf_data,$param){
		$table=['tag'=>'table.wp-block-catpow-simpletable.inputs'];
		foreach($conf_data['meta'] as $name=>$conf){
			$class_name=\cp::get_class_name('meta',$conf['type']);
			if(!class_exists($class_name)){continue;}
			if(!$class_name::$has_parent && !($param&1)){continue;}
			if($class_name::$is_database && !($param&2)){continue;}
			if($class_name::$has_children && !$class_name::$is_unit_input){$input=static::get_table_code_data($conf,$param);}
			else{$input='<?php input(\''.$name.'\'); ?>';}
			$table[$name]=[!empty($conf['required'])?'tr.required':'tr',
				['th',$conf['label']],
				['td',$input]
			];
		};
		$unit=['div[<?php _unit(); ?>]',$table];
		if(!empty($conf_data['multiple']) && $conf_data['multiple']<2){$unit[]='<?php controller(); ?>';}
		return ['',
			'<?php «(\''.$conf_data['name'].'\'); ?>',
			['div[<?php _item(); ?>]',
				'<?php foreach(loop() as $'.$conf_data['name'].'): ?>',
				$unit,
				'<?php endforeach; ?>'
			],
			'<?php »(); ?>'
		];
	}
}

?>