<?php
namespace Catpow\meta;

class PostSchedule extends UI{
	public static $can_search=false,$defaultParam=['statuses'=>['publish','private','draft','pending','trash','delete']];
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		$events=[];
		$crons=_get_cron_array();
		$params=self::get_cron_setting_params($id);
		foreach($crons as $timestamp=>$cron){
			if(empty($cron['cp_cron'])){continue;}
			foreach($params as $post_status=>$param){
				if(isset($cron['cp_cron'][$param['key']])){
					$events[]=[
						'time'=>$timestamp,
						'status'=>$post_status
					];
				}
			}
		}
		return $events;
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		sleep(1);
		$crons=_get_cron_array();
		$params=self::get_cron_setting_params($id);
		foreach($crons as $timestamp=>$cron){
			if(empty($cron['cp_cron'])){continue;}
			foreach($params as $post_status=>$param){
				if(isset($cron['cp_cron'][$param['key']])){
					unset($crons[$timestamp]['cp_cron'][$param['key']]);
					if(empty($crons[$timestamp]['cp_cron'])){unset($crons[$timestamp]['cp_cron']);}
				}
			}
			if(empty($crons[$timestamp])){unset($crons[$timestamp]);}
		}
		if(!empty($vals)){
			foreach($vals as $val){
				if(empty($params[$val['status']])){continue;}
				$crons[$val['time']]['cp_cron'][$params[$val['status']]['key']]=[
					'schedule'=>false,
					'args'=>$params[$val['status']]['args']
				];
			}
		}
		uksort($crons,'strnatcasecmp');
		_set_cron_array($crons);
	}
	public static function output($meta,$prm){
		if(empty($meta->value['time'])){return false;}
		return wp_date('Y-m-d H:i',$meta->value['time']).' '.$meta->value['status'];
	}
	public static function get_cron_setting_params($post_id){
		$params=[];
		foreach(self::$defaultParam['statuses'] as $post_status){
			if($post_status==='delete'){$args=['wp_delete_post',[$post_id,true]];}
			else{$args=['wp_update_post',[['ID'=>$post_id,'post_status'=>$post_status]]];}
			$params[$post_status]=[
				'key'=>md5(serialize($args)),
				'args'=>$args
			];
		}
		return $params;
	}
}
?>