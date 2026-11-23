<?php
namespace Catpow\meta;
use Catpow\util\media_protect;

class ProtectedMedia extends UI{
	public static
		$output_type='protected_media',
		$can_search=false;
	
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
		return static::get_protected_media_output($meta,$prm,false);
	}
	public static function get_output_html_data($meta,$prm){
		return static::get_protected_media_output($meta,$prm,true);
	}
	protected static function get_protected_media_output($meta,$prm,$as_html_data){
		if(empty($meta->value['id'])){return $as_html_data?null:'';}
		$id=$meta->value['id'];
		if(self::should_allow($meta,$prm)){media_protect::allow($id);}
		if($prm=='url'){return wp_get_attachment_url($id);}
		if(empty($post=get_post($id))){return $as_html_data?null:'';}
		if($prm=='type'){return $post->post_mime_type;}
		if($prm==='alt'){return $post->_wp_attachment_image_alt;}
		$type=substr($post->post_mime_type,0,5);
		if($type==='image'){
			$size=is_array($prm)?($prm['size']??'full'):(has_image_size($prm)?$prm:'full');
			return wp_get_attachment_image($id,$size);
		}
		if($type==='video' || $type==='audio'){
			$url=wp_get_attachment_url($id);
			$params=array_merge($meta->conf,(array)$prm);
			if($as_html_data){
				return [$type,'class'=>$prm['class']??null,'src'=>$url]+media::get_player_attributes($params);
			}
			return sprintf('<%1$s src="%2$s"%3$s></%1$s>',$type,$url,media::get_player_attr($params));
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