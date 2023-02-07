<?php
/**
* rewrite_rules
*/
namespace Catpow\util;
class rewrite{
	public static function get_rules(){
		$rules=[
			'callback/(.+)/?$'=>'index.php?cp_callee=$matches[1]'
		];
		foreach(\cp::$data_types as $data_type){
			$datas=$GLOBALS[\cp::get_conf_data_name($data_type)];
			if(empty($datas)){continue;}
			foreach($datas as $data_name=>$data){
				foreach(['','alias_'] as $pref){
					if(isset($data[$pref.'template'])){
						foreach($data[$pref.'template'] as $tmp){
							$tmp_data=explode('-',$tmp);
							$tmp_name=$tmp_data[0];
							$tmp_slug=$tmp_data[1]??null;

							$class_name=\cp::get_class_name('template_type',$tmp_name);
							if(!class_exists($class_name)){continue;}
							foreach($class_name::get_rewrite_rule($data[$pref.'path']) as $rewrite_rule){
								if(isset($tmp_slug)){
									$rewrite_rule['reg'].="/{$tmp_slug}";
									$rewrite_rule['rep'].="&cp_tmp_slug={$tmp_slug}";
								}
								$rewrite_rule['reg'].='/?$';
								$rules[$rewrite_rule['reg']]=$rewrite_rule['rep'];
								
							}
						}
					}
				}
			}
		}
		return $rules;
	}
}

?>