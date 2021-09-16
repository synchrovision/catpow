<?php
namespace Catpow\meta;

class PostSchedule extends UI{
	public static $defaultParam=['statuses'=>['publish','private','draft','pending','trash']];
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
		$crons=_get_cron_array();
		$params=self::get_cron_setting_params($id);
		error_log(var_export($vals,1).__FILE__.':'.__LINE__);
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
		foreach($vals as $val){
			$crons[$val['time']]['cp_cron'][$params[$val['status']]['key']]=[
				'schedule'=>false,
				'args'=>$params[$val['status']]['args']
			];
		}
		uksort($crons,'strnatcasecmp');
		_set_cron_array($crons);
	}
	public static function get_cron_setting_params($post_id){
		$params=[];
		foreach(self::$defaultParam['statuses'] as $post_status){
			$args=['wp_update_post',[['ID'=>$post_id,'post_status'=>$post_status]]];
			$params[$post_status]=[
				'key'=>md5(serialize($args)),
				'args'=>$args
			];
		}
		return $params;
	}
}
?>