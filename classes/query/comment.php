<?php
namespace Catpow\query;

class comment extends query{
	public static
		$data_type='comment',
		$data_type_name='type',
		$data_id_name='comment_ID',
		$query_class='WP_Comment_Query',
		$search_keys=[];
	
	
	public static function get($data_name,$data_id){
		return get_comment($data_id);
	}
	public static function set($data_name,$data_id,$object_data){
		$object_data['comment_type']=$data_name;
		$object_data['comment_ID']=$data_id;
		return wp_update_comment($object_data);
	}
	public static function insert($object_data){
		$object_data=array_merge([
			'comment_content'=>''
		],$object_data);
		return wp_insert_comment($object_data);
	}
	public static function update($object_data){
		return wp_update_comment($object_data);
	}
	public static function delete($data_name,$data_id){
		return wp_delete_comment($data_id,true);
	}
	
	public static function fill_query_vars($q){
		if(is_numeric($q)){$q=['ID'=>$q];}
		if(isset($q['data_name'])){$q['type']=$q['data_name'];}
		if(isset($q['limit'])){
			if(isset($q['paged'])){$q['offset']=$q['limit']*$q['paged'];}
			$q['number']=$q['limit'];
		}
		if(isset($q['include'])){$q['comment__in']=$q['include'];}
		return $q;
	}
	
	function is_empty(){
		return empty($this->query->query());
	}
	public function count(){
		return $this->query->count;
	}
	public function loop(){
		foreach($this->query->query() as $comment){
			yield $comment->comment_ID=>$comment;
		}
	}
	public static function manual_loop($comments){
		foreach($comments as $comment){
			yield $comment->comment_ID=>$comment;
		}
	}
}

?>