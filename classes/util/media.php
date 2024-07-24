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
	
	public static function get_last_attachment_id_with_name($name){
		global $wpdb;
		return $wpdb->get_var("SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_wp_attached_file' AND meta_value LIKE '%{$name}' ORDER BY meta_value DESC");
	}
	//hooks
	public static function callback_wp_generate_attachment_metadata($metadata,$attachment_id){
		$dir=wp_upload_dir()['basedir'].'/'.dirname($metadata['file']);
		$sizes=$metadata['sizes'];
		$sizes['full']=[
			'file'=>substr(strrchr($metadata['file'],'/'),1),
			'mime-type'=>mime_content_type($dir.'/'.substr(strrchr($metadata['file'],'/'),1))
		];
		$webp_files=[];
		foreach($sizes as $size=>$size_data){
			$f=$dir.'/'.$size_data['file'];
			if(function_exists('imagewebp')){
				switch($size_data['mime-type']){
					case 'image/jpeg':
						$im=imagecreatefromjpeg($f);break;
					case 'image/png':
						$im=imagecreatefrompng($f);break;
					case 'image/gif':
						$im=imagecreatefromgif($f);break;
					default:
						continue 2;
				}
				imagepalettetotruecolor($im);
				imagewebp($im,$f.'.webp');
			}
			else{
				if(false===passthru("cwebp {$f} -o {$f}.webp")){continue;}
			}
			$webp_files[]=$size_data['file'].'.webp';
		}
		if(!empty($webp_files)){
			$metadata['webp_files']=$webp_files;
		}
		return $metadata;
	}
	public static function callback_delete_attachment($attachment_id){
		$metadata=wp_get_attachment_metadata($attachment_id);
		$dir=wp_upload_dir()['basedir'].'/'.dirname($metadata['file']);
		if(!empty($metadata['webp_files'])){
			foreach($metadata['webp_files'] as $webp_file){
				wp_delete_file($dir.'/'.$webp_file);
			}
		}
	}
	public static function callback_image_downsize($out,$id,$size){
		static $is_original=true;
		$metadata=wp_get_attachment_metadata($id);
		if($is_original && isset($metadata['alt_image']) && is_string($size)){
			if(isset($metadata['alt_image'][$size])){
				$is_original=false;
				return image_downsize($metadata['alt_image'][$size],$size);
			}
		}
		$is_original=true;
		return $out;
	}
	public static function callback_wp_prepare_attachment_for_js($response,$attachment,$meta){
		global $_wp_additional_image_sizes;
		$sizes=array_keys($_wp_additional_image_sizes);
		$sizes[]='medium_large';
		foreach($sizes as $size){
			if($response['type']==='image'){
				$src=wp_get_attachment_image_src($response['id'],$size);
				$response['sizes'][$size]=[
					'url'=>$src[0],
					'width'=>$src[1],
					'height'=>$src[2],
					'resized'=>$src[3]
				];
			}
		}
		if(isset($meta['alt_image'])){
			foreach($meta['alt_image'] as $size=>$id){
				if($response['type']!=='image'){
					$response['sizes'][$size]['url']=wp_get_attachment_url($meta['alt_image'][$size]);
				}
				else{
					$src=wp_get_attachment_image_src($meta['alt_image'][$size],$size);
					$response['sizes'][$size]=[
						'url'=>$src[0],
						'width'=>$src[1],
						'height'=>$src[2],
						'resized'=>$src[3]
					];
				}
			}
		}
		return $response;
	}
}

?>