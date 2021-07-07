<?php
/**
* WPのAjaxのメソッド
*/
namespace Catpow\util;
class seo{
	public static function get_url(){
		static $url;
		if(isset($url)){return $url;}
		if(is_singular()){
			return $url=get_permalink();
		}
		return $url=($_SERVER['HTTPS']?'https':'http').':'.$_SERVER['HOST'].'/'.$_SERVER['REQUEST_URI'];
	}
	public static function get_image(){
		static $image;
		if(isset($image)){return $image;}
		if(is_singular()){
			global $post_types;
			$post_type_data=$post_types[get_post_type()];
			if(isset($post_type_data['meta']['image'])){
				if($image_data=wp_get_attachment_image_src(get_post_meta(get_the_ID(),'image',true),'vga')){
					return $image=$image_data[0];
				}
			}
			if(has_post_thumbnail()){return $image=get_the_post_thumbnail_url();}
		}
	}
	public static function get_desc(){
		static $desc;
		if(isset($desc)){return $desc;}
		if(is_singular()){
			if(isset($post_type_data['meta']['desc'])){
				if($desc=get_post_meta(get_the_ID(),'desc',true)){
					return $desc;
				}
			}
			if(has_excerpt()){return $desc=get_the_excerpt();}
			if($f=get_option(self::get_format_name('desc'))){
				
			}
		}
		if(is_tax()){
			$term=get_queried_object();
			if($desc=$term->description){return $desc;}
		}
		if($desc=get_option('description')){return $desc;}
		return $desc=get_bloginfo('description');
	}
	public static function get_format_name($type,$content_path=null){
		if(empty($content_path)){$content_path=\cp::get_the_path_data();}
		if(is_array($content_path)){$content_path=\cp::create_content_path($content_path);}
		return $type.'_format-'.str_replace('/','-',$content_path);
		
	}
}

?>