<?php
namespace Catpow\meta;
use Catpow\util\media_protect;

class ProtectedMedia extends UI{
	public static $output_type='protected_media';
	
	public static function get($data_type,$data_name,$id,$meta_name,$conf){
		$ids=parent::get($data_type,$data_name,$id,$meta_name,$conf);
		if(empty($ids)){return [];}
		$vals=[];
		foreach($ids as $id){
			$vals[]=['id'=>$id,'cond'=>media_protect::get_cond($id)];
		}
		return $vals;
	}
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		foreach($vals??[] as $val){media_protect::set_cond($val['id'],$val['cond']);}
		parent::set($data_type,$data_name,$id,$meta_name,array_column($vals??[],'id'),$conf);
	}
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		foreach($vals??[] as $val){media_protect::set_cond($val['id'],$val['cond']);}
		parent::add($data_type,$data_name,$id,$meta_name,array_column($vals??[],'id'),$conf);
	}
	
	public static function fill_param($param,$meta){
		$param=parent::fill_param($param,$meta);
		if(!is_array($param['value'])){$param['value']=[];}
		if(isset($param['value']['id'])){
			$id=$param['value']['id'];
			$param['value']['url']=wp_get_attachment_url($id);
			$param['value']['mime']=get_post_mime_type($id);
		}
		
		$param['default']=[
			'url'=>\cp::get_file_url('images/dummy.jpg'),
			'mime'=>'image/jpeg'
		];
		return $param;
	}
	public static function output($meta,$prm){
		if(empty($meta->value['id'])){return '';}
		if(self::should_allow($meta,$prm)){media_protect::allow($meta->value['id']);}
		$val=$meta->value['id'];
		if($prm=='url'){return wp_get_attachment_url($val);}
		if(empty($post=get_post($val))){return '';}
		if($prm=='type'){return $post->post_mime_type;}
		if($prm==='alt'){return $post->_wp_attachment_image_alt;}
		switch(substr($post->post_mime_type,0,5)){
			case 'image':
				if(is_array($prm)){
					return wp_get_attachment_image($val,$prm['size']??'full');
				}
				return wp_get_attachment_image($val,has_image_size($prm)?$prm:'full');
			case 'video':
				return sprintf(
					'<video src="%s"%s></video>',
					wp_get_attachment_url($val),
					static::get_player_attr(array_merge($meta->conf,(array)$prm))
				);
			case 'audio':
				return sprintf(
					'<audio src="%s"%s></audio>',
					wp_get_attachment_url($val),
					static::get_player_attr(array_merge($meta->conf,(array)$prm))
				);
		}
	}
	public static function input($meta,$prm){
		if(isset($meta->value['id']) && self::should_allow($meta,$prm)){media_protect::allow($meta->value['id']);}
		return parent::input($meta,$prm);
	}
	public static function should_allow($meta,$prm){
		if(empty($meta->value['id'])){return false;}
		if(is_user_logged_in() && get_post($meta->value['id'])->post_author == get_current_user_id()){return true;}
		if(current_user_can($meta->conf['capability']??'administrator')){return true;}
		return false;
	}
}
?>