<?php
/**
* アップロードファイルにアクセス制限をかける
* 
*/
namespace Catpow\util;
class media_protect{
	public static function protect($id){
		$metadata=get_post_meta($id,'_wp_attachment_metadata',true);
		$metadata['protected']=true;
		update_post_meta($id,'_wp_attachment_metadata',$metadata);
		foreach(media::get_all_attachment_files($id) as $file){
			chmod($file,0600);
		}
	}
	public static function unprotect($id){
		$metadata=get_post_meta($id,'_wp_attachment_metadata',true);
		unset($metadata['protected']);
		update_post_meta($id,'_wp_attachment_metadata',$metadata);
		foreach(media::get_all_attachment_files($id) as $file){
			chmod($file,0644);
		}
	}
	public static function allow($id){
		if(empty(\cp::$data['allowed_protected_media'][$id])){
			$upload_dir=wp_get_upload_dir();
			$primary_file=get_post_meta($id,'_wp_attached_file',true);
			\cp::$data['allowed_protected_media'][$id]=[
				'path'=>$upload_dir['basedir'].'/'.dirname($primary_file)
			];
		}
	}
	public static function filter_wp_get_attachment_url($url,$id){
		$metadata=get_post_meta($id,'_wp_attachment_metadata',true);
		if(!empty($metadata['protected'])){
			$file=basename($url);
			return plugins_url()."/catpow/callee/protected_media.php?path={$id}/{$file}";
		}
		return $url;
	}
}

?>