<?php
namespace Catpow\meta;

class pdf extends media{
	
	public static function output($meta,$prm){
		$val=$meta->value;
		$rtn=array();
		if($prm=='url'){return wp_get_attachment_url($val);}
		if($prm=='path'){return wp_upload_dir()['path'].get_post_meta($val,'_wp_attached_file',1);}
		return sprintf(
			'<a class="pdf" target="_blank" href="%1$s"><object data="%1$s" type="application/pdf"></object></a>',
			wp_get_attachment_url($val)
		);
	}
	
	public static function get_input($path,$meta,$val){
		
		wp_enqueue_media();
		wp_enqueue_script('cp_media_upload');
		
		if(empty($val)){
			return sprintf(
					'<span class="ajax_upload_media_wrapper">'.
					'<span id="%1$s"%2$s><object class="pdf" data="%3$s" type="application/pdf">'.
					'</object><input type="hidden" name="%4$s" value=""/></span>'.
					'</span>',
				self::get_input_id($path),$attr,$dummy,self::get_input_name($path)
			);
		}
		
		$src=wp_get_attachment_url($v);
		return sprintf(
			'<span class="ajax_upload_media_wrapper">'.
			'<span id="%1$s"%2$s><object class="pdf" data="%3$s" type="application/pdf">'.
			'</object><input type="hidden" name="%4$s" value="%5$s"/></span>'.
			'</span>',
			self::get_input_id($path),$attr,$src?$src:$dummy,self::get_input_name($path),$val
		);
	}
}
?>