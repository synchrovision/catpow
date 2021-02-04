<?php
/**
* アップロードファイルにアクセス制限をかける
* 
*/
namespace Catpow\util;
class media_protect{
	public static function protect($id){
		$metadata=get_post_meta($id,'_wp_attachment_metadata',true);
		if(!empty($metadata['protected'])){return;}
		
		$metadata['protected']=true;
		$metadata['file']="catpow/p{$id}/".$metadata['file'];
		
		$basedir=wp_get_upload_dir()['basedir'];
		$dir=$basedir.'/'.dirname($metadata['file']);
		$depth=substr_count($basedir,'/',strpos($basedir,'wp-content/uploads'));
		
		$files=media::get_all_attachment_files($id);
		
		if(!is_dir($dir)){mkdir($dir,0777,true);}
		if(!file_exists($htaccess_file=$basedir.'/catpow/.htaccess')){
			$subdir=substr($basedir,strpos($basedir,'/uploads')+9);
			if(!empty($subdir)){$subdir.='/';}
			file_put_contents(
				$htaccess_file,
				"RewriteEngine on\n".
				"RewriteRule (.+) ".str_repeat('../',$depth+1)."plugins/catpow/callee/protected_media.php?path={$subdir}catpow/$1 [L,QSA]"
			);
		}
		foreach($files as $file){
			if(file_exists($file)){rename($file,$dir.'/'.basename($file));}
		}
		update_post_meta($id,'_wp_attachment_metadata',$metadata);
		update_post_meta($id,'_wp_attached_file',$metadata['file']);
	}
	public static function unprotect($id){
		$metadata=get_post_meta($id,'_wp_attachment_metadata',true);
		if(empty($metadata['protected'])){return;}
		
		unset($metadata['protected']);
		$metadata['file']=preg_replace('|^catpow/p\d+/|','',$metadata['file']);
		
		$basedir=wp_get_upload_dir()['basedir'];
		$dir=$basedir.'/'.dirname($metadata['file']);
		
		$files=media::get_all_attachment_files($id);
		if(!is_dir($dir)){mkdir($dir,0777,true);}
		foreach($files as $file){
			if(file_exists($file)){rename($file,$dir.'/'.basename($file));}
		}
		dir::delete($basedir."/catpow/p{$id}");
		update_post_meta($id,'_wp_attachment_metadata',$metadata);
		update_post_meta($id,'_wp_attached_file',$metadata['file']);
	}
	public static function allow($id){
		\cp::$data['allowed_protected_media'][get_current_blog_id()][$id]=true;
	}
	public static function clear_allowed(){
		unset(\cp::$data['allowed_protected_media'][get_current_blog_id()]);
	}
}

?>