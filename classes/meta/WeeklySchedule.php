<?php
namespace Catpow\meta;

class WeeklySchedule extends UIDB{
	static $ui='WeeklySchedule',$is_bulk_input=true,$output_type='data',$defaultParam=[];
	public static function fill_conf(&$conf){
		$conf['meta']=array_merge([
			'day'=>['type'=>'select_json','value'=>'youbi'],
			'start'=>['type'=>'time'],
			'end'=>['type'=>'time'],
		],$conf['meta']??[]);
	}
}
?>