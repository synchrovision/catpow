<?php
namespace Catpow\meta;

class image extends media{
	public static function input($meta,$prm){
		return self::get_input($meta->the_data_path,$meta->conf,$meta->value);
	}
	
	public static function get_input($path,$conf,$val){
		static $nonce;
		if(!isset($nonce)){$nonce=wp_create_nonce('media-form');}
		
		if(isset($conf['dummy'])){$dummy=get_template_directory_uri('/images/'.$conf['dummy']);}
		else{$dummy=\cp::get_file_url('images/dummy.jpg');}
		$size=isset($conf['input-size'])?$conf['input-size']:(isset($conf['size'])?$conf['size']:'full');
		
		wp_enqueue_script('cp_file_upload');
		
		if(empty($val)){$src=false;}
		else{
			$src=wp_get_attachment_image_src($val,$size);
			if($src==false)$src=wp_get_attachment_url($val);
			else{$src=$src[0];}
		}
		return sprintf(
			'<span class="ajax_upload_file_wrapper">'.
			'<img class="ajax_upload_file image" style="max-width:100%%" data-nonce="%s" src="%s"/>'.
			'<input type="hidden" name="%s" value="%s"/>'.
			'</span>',
			$nonce,$src?$src:$dummy,\cp::get_input_name($path),$val
		);
	}
}

?>