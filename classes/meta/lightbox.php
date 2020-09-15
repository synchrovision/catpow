<?php
namespace Catpow\meta;

class lightbox extends media{
	
	public static function output($meta,$prm){
		$val=$meta->value;
		$post=get_post($val);
		$prm=(array)$prm;
		$prm=array_merge([
			'thumb'=>'medium',
			'size'=>'large',
			'image_attr'=>json_encode(static::get_image_attr_data(array_merge($meta->conf,$prm))),
			'player_attr'=>json_encode(static::get_player_attr_data(array_merge(['controls'=>1],$meta->conf,$prm)))
		],$prm);
		$format='<div class="cp_lightbox %s" data-src="%s" data-type="%1$s" data-title="%s" data-attr=\'%s\'><img src="%s"/></div>';
		switch($media=substr($post->post_mime_type,0,5)){
			case 'image':
				return sprintf(
					$format,
					$media,
					image_downsize($val,$prm['size'])[0],
					$post->post_title,
					$prm['image_attr'],
					image_downsize($val,$prm['thumb'])[0]
				);
			case 'video':
			case 'audio':
				if(has_post_thumbnail($val)){$thumb=image_downsize(get_post_thumbnail_id($val),$prm['thumb'])[0];}
				else{$thumb=\cp::get_file_url('thumbnail/'.$media.'png');}
				return sprintf(
					$format,
					$media,
					wp_get_attachment_url($val),
					$post->post_title,
					$prm['player_attr'],
					$thumb
				);
		}
	}
	public static function get_image_attr_data($prm){
		return array_intersect_key($prm,array_flip(['width','heigth']));
	}
	public static function get_player_attr_data($prm){
		return array_intersect_key($prm,array_flip(['controls','autoplay','muted','playsinline','preload','loop']));
	}
}

?>