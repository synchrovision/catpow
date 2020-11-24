<?php
/**
* アップロードファイル関連のメソッド
* 
*/
namespace Catpow\util;
class media{
	public static function get_all_attachment_files($id){
		static $cache;
		if(isset($cache[$id])){return $cache[$id];}
		$basedir=wp_get_upload_dir()['basedir'];
		$primary_file=get_post_meta($id,'_wp_attached_file',true);
		if(0!==strpos($primary_file,$basedir)){
			$primary_file=$basedir.'/'.ltrim($primary_file,'/');
		}
		$rtn=['full'=>$primary_file];
		$dir=dirname($primary_file);
		if(wp_attachment_is_image($id)){
			$metadata=get_post_meta($id,'_wp_attachment_metadata',true);
			foreach($metadata['sizes'] as $size=>$data){
				$rtn[$size]=$dir.'/'.$data['file'];
			}
		}
		return $cache[$id]=$rtn;
	}
	public static function get_all_attachment_file_paths($id){
		return array_map(function($file){
			return substr($file,strpos($file,'/uploads/')+9);
		},self::get_all_attachment_files($id));
	}
	public static function upload_image($f,$post_id=0){
		$filename=basename($f['name']);
		$filename=trim($filename);
		$filename=ereg_replace(" ", "-", $filename);
		$upload_dir_var=wp_upload_dir(date('Y/m'));
		$upload_dir=$upload_dir_var['path'];
		$uploaddir=realpath($upload_dir);
		$uploadfile=$uploaddir.'/'.$filename;

		if ($f["size"] === 0)return false;
		if(!@move_uploaded_file( $f["tmp_name"], $uploadfile))return false;

		$slugname=preg_replace('/\.[^.]+$/', '', basename($uploadfile));

		if ( file_exists($uploadfile) ) {
			$ext = '';
			switch($f['type']){
				case 'image/jpeg':$ext='jpg';break;
				case 'image/png':$ext='png';break;
				case 'image/gif':$ext='gif';break;
			}

			//アップロードファイルを添付する
			$attachment = array(
				'post_mime_type' => $f['type'], 
				'post_title' => $slugname, 
				'post_content' => '', 
				'post_status' => 'inherit'
			);
			$attach_id = wp_insert_attachment( $attachment, $uploadfile, $post_id );

			require_once(ABSPATH . "wp-admin" . '/includes/image.php');
			$attach_data = wp_generate_attachment_metadata( $attach_id, $uploadfile );
			wp_update_attachment_metadata( $attach_id,  $attach_data );
			return $attach_id;
		}else{
			return false;
		}
	}
}

?>