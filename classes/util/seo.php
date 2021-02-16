<?php
/**
* WPのAjaxのメソッド
*/
namespace Catpow\util;
class seo{
	public static function get_url(){
		static $url;
		if(isset($url)){return $url;}
		if(is_single()){
			return $url=get_parmalink();
		}
		return $url=($_SERVER['HTTPS']?'https':'http').':'.$_SERVER['HOST'].'/'.$_SERVER['REQUEST_URI'];
	}
	public static function get_image(){
		static $image;
		if(isset($image)){return $image;}
		if(is_single()){
			global $post_types;
			$post_type_data=$post_types[get_post_type()];
			if(isset($post_type_data['meta']['image'])){
				if($image=wp_get_attachment_image_src(get_post_meta(get_the_ID(),'image',true),'vga')['url']){
					return $image;
				}
			}
			if(has_post_thumbnail()){return $image=get_the_post_thumbnail_url();}
		}
		
	}
	public static function get_desc(){
		static $desc;
		if(isset($desc)){return $desc;}
		if(is_single()){
			if(isset($post_type_data['meta']['desc'])){
				if($desc=get_post_meta(get_the_ID(),'desc',true)){
					return $desc;
				}
			}
			if(has_excerpt()){return $desc=get_the_excerpt();}
		}
		if($desc=get_option('description')){return $desc;}
		return $desc=get_bloginfo('description');
	}
}

?>