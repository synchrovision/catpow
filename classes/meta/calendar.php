<?php
namespace Catpow\meta;
include __DIR__.'/../calendar.php';

class calendar extends meta{
	public static
		$bulk_input=true,
		$bulk_output=true;
	
	
	public static function output($meta,$prm){
		$val=$meta->value;
		if(isset($meta->conf['range'])){
			$prm['range']=$meta->conf['range'];
		}
		if(isset($meta->conf['meta'])){
			$prm['class']=array('multi');
			foreach($meta->conf['meta'] as $n=>$data){
				$prm['data'][$n]=array('type'=>'text','date'=>$val[0][$n]);
				$prm['data'][$n]['label']=isset($data['label'])?$data['label']:$n;
			}
		}else{
			$prm['class']=array('single');
			$prm['data']=array();
			$prm['data'][$meta->conf['name']]=array('type'=>'label','date'=>$val);
			$prm['data'][$meta->conf['name']]['label']=isset($meta->conf['label'])?$meta->conf['label']:$meta->conf['name'];
		}
		$class_name=\cp::get_class_name('calendar');
		$cals=new $class_name($prm);
		return $cals->get();
	}
	public static function input($meta,$prm){
		$path=$meta->data_path;
		$val=$meta->value;
		if(!isset($meta->conf['data-type']))$meta->conf['data-type']='DATE';
		$prm=array(
			'year'=>'%s年','wareki'=>false,'month'=>'%s月','month_en'=>false,'month_ja'=>false,'start_week'=>1,
			'tab'=>false,'data'=>array(),'class'=>array()
		);
		foreach($prm as $n=>&$v){
			if(isset($meta->conf[$n]))$v=$meta->conf[$n];
		}
		if(isset($meta->conf['meta'])){
			foreach($meta->conf['meta'] as $n=>$conf){
				$prm['data'][$n]=array(
					'type'=>empty($conf['radio'])?'checkbox':'radio',
					'checked'=>(isset($val[0][$n]))?$val[0][$n]:array(),
					'name'=>self::get_input_name($path.'/0/'.$n).'[]',
					'class'=>'',
					'label'=>isset($conf['label'])?$conf['label']:$n
				);
			}
		}else{
			end($name);prev($name);
			$prm['data'][current($name)]=array(
				'type'=>empty($meta->conf['radio'])?'checkbox':'radio',
				'checked'=>$val,
				'name'=>self::get_input_name($path).'[]',
				'class'=>'',
				'label'=>isset($meta->conf['label'])?$meta->conf['label']:current($name)
			);
		}
		if(isset($meta->conf['range'])){
			$prm['range']=$meta->conf['range'];
		}
		return self::get_inputs($prm);
	}
	
	public static function get_inputs($prm){
		$prm_default=array(
			'year'=>'%s年','wareki'=>false,'month'=>'%s月','month_en'=>false,'month_ja'=>false,'start_week'=>1,
			'tab'=>false,'data'=>array(),'class'=>array()
		);
		$prm=array_merge($prm_default,$prm);
		$prm['class'][]=(count($prm['data'])>1)?'input-multi':'input-single';
		$wrapper_class=['calendars_wrapper'];
		foreach($prm['data'] as $key=>&$val){
			$val=array_merge(array('type'=>'checkbox','label'=>$key,'checked'=>array()),$val);
			$val['checked']=array_filter($val['checked']);
			$wrapper_class[]=$val['class'];
		}
		$class_name=\cp::get_class_name('calendar');
		$cals=new $class_name($prm);
		$tmp=$cals->get();
		wp_enqueue_script('cp_calendar_script',plugins_url().'/catpow/lib/calendar/script.js');
		if(empty($prm['range'])){
			$range=$cals->range();
			$cals_id=uniqid();
			$_SESSION[$cals_id]=serialize($cals);
			array_unshift($tmp,sprintf(
				'<button type="button" class="cp_calendar_increase cp_calendar_prepend" data-role="calendar-input-prepend" data-range="%s" data-cals_id="%s">＋</button>',
				reset($range).' -1 month',$cals_id
			));
			array_push($tmp,sprintf(
				'<button type="button" class="cp_calendar_increase cp_calendar_append" data-role="calendar-input-append" data-range="%s" data-cals_id="%s">＋</button>',
				end($range).' +1 month',$cals_id
			));
		}
		$rtn=sprintf('<div class="%s">',implode(' ',$wrapper_class));
		foreach($tmp as $item){
			$rtn.=sprintf('<div class="calendar_container" data-role="calendar-container">%s</div>',$item);
		}
		$rtn.='</div>';
		return (array)$rtn;
	}
}
?>