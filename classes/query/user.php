<?php
namespace Catpow\query;

class user extends query{
	public static
		$data_type='user',
		$data_type_name='role',
		$query_class='WP_User_Query',
		$search_keys=[
			'number'=>0,'offset'=>0,'paged'=>0,
			'orderby'=>0,'order'=>0,
			'date_query'=>1,'meta_key'=>0,'meta_value'=>0,'meta_compare'=>0,
			'has_published_posts'=>0,'count_total'=>0,'fields'=>1,
			'include'=>1,'exclude'=>1,'blog_id'=>0
		],
		$key_translation=[
			'limit'=>'query_limit',
		],
		$data_keys=[
			'role',
			'ID',
			'user_login',
			'user_email',
			'user_pass',
			'first_name',
			'last_name',
			'display_name'
		];
	
	
	public static function get($data_name,$data_id){
		return get_user($data_id);
	}
	public static function set($data_name,$data_id,$object_data){
		if(!in_array($data_name,['guest','common'])){$object_data['role']=$data_name;}
		$object_data['ID']=$data_id;
		return static::update($object_data);
	}
	public static function insert($object_data){
		$object_data=array_map(function($val){
			if(is_array($val)){return reset($val);}
			return $val;
		},$object_data);
		if(empty($object_data['user_login'])){
			do{$object_data['user_login']=sprintf('user%d%04d',date('ym'),$n++);}
			while((username_exists($object_data['user_login'])));
		}
		if(empty($object_data['user_pass'])){
			$object_data['user_pass']=wp_generate_password();
		}
		if(!empty($object_data['ID'])){$object_data['user_pass']=wp_hash_password($object_data['user_pass']);}
		$user_id=wp_insert_user($object_data);
		if(is_wp_error($user_id)){
			throw new \Exception($user_id->get_error_message());
		}
		return $user_id;
	}
	public static function update($object_data){
		$object_data=array_map(function($val){
			if(is_array($val)){return reset($val);}
			return $val;
		},$object_data);
		if(in_array($object_data['role'],['guest','common'])){unset($object_data['role']);}
		return wp_update_user($object_data);
	}
	public static function delete($data_name,$data_id){
		return wp_delete_user($data_id);
	}
	
	public static function fill_query_vars($q){
		if(is_numeric($q)){$q=['include'=>[$q]];}
		if(isset($q['ID'])){$q['include']=$q['ID'];}
		if(isset($q['data_name']) && $q['data_name']!=='guest' && $q['data_name']!=='common'){$q['role']=$q['data_name'];}
		if(isset($q['limit'])){$q['number']=$q['limit'];}
		if(isset($q['paged'])){$q['offset']=$q['number']*$q['paged'];}
		return $q;
	}
	public static function get_the_url($object){return home_url(reset($object->roles).'/'.$object->ID);}
	
	function is_empty(){
		return empty($this->query->results);
	}
	public function count(){
		return $this->query->get_total();
	}
	public function loop(){
		foreach($this->query->results as $user){
			yield $user->ID=>$user;
		}
	}
	public static function manual_loop($users){
		foreach($users as $user){
			yield $user->ID=>$user;
		}
	}
}

?>