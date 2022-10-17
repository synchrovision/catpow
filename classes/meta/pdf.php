<?php
namespace Catpow\meta;
use Catpow\util\media_protect;

class pdf extends media{
	
	public static function set($data_type,$data_name,$id,$meta_name,$vals,$conf){
		self::protectMediaIfShould($data_type,$data_name,$id,$meta_name,$vals,$conf);
		parent::set($data_type,$data_name,$id,$meta_name,$vals,$conf);
	}
	public static function add($data_type,$data_name,$id,$meta_name,$vals,$conf){
		self::protectMediaIfShould($data_type,$data_name,$id,$meta_name,$vals,$conf);
		parent::add($data_type,$data_name,$id,$meta_name,$vals,$conf);
	}
	public static function protectMediaIfShould($data_type,$data_name,$id,$meta_name,$vals,$conf){
		if(!empty($conf['protect']) && $data_type==='post' && get_post_status($id)==='future'){
			$time=get_post_timestamp($id);
			foreach((array)$vals as $val){
				media_protect::set_cond($val,['time'=>['from'=>$time]]);
			}
		}
	}
	public static function output($meta,$prm){
		$val=$meta->value;
		$rtn=array();
		if($prm=='url'){return wp_get_attachment_url($val);}
		if($prm=='path'){return wp_upload_dir()['path'].get_post_meta($val,'_wp_attached_file',1);}
		$url=wp_get_attachment_url($val);
		return sprintf(
			'<a class="link-pdf" target="_blank" href="%s">%s</a>',
			$url,basename($url)
		);
	}
	public static function get_input($path,$conf,$val){
		wp_enqueue_media();
		wp_enqueue_script('cp_media_upload');
		
		$src=empty($val)?null:wp_get_attachment_url($val);
		return sprintf(
			'<span class="ajax_upload_media is-type-application is-subtype-pdf" data-media-type="pdf">%s</span>'.
			'<input type="hidden" name="%s" value="%s"/>',
			$src?basename($src):'───',
			\cp::get_input_name($path),$val
		);
	}
}
?>