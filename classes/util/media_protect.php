<?php
/**
* アップロードファイルにアクセス制限をかける
* 
*/
namespace Catpow\util;
class media_protect{
	const DIR_NAME='protected';
	public static function protect($id){
		$metadata=get_post_meta($id,'_wp_attachment_metadata',true);
		if(!empty($metadata['protected'])){return;}
		$dirname=self::DIR_NAME;
		
		$metadata['protected']=true;
		$metadata['file']="{$dirname}/p{$id}/".($metadata['file']??get_post_meta($id,'_wp_attached_file',true));
		
		$basedir=wp_get_upload_dir()['basedir'];
		$dir=$basedir.'/'.dirname($metadata['file']);
		$depth=substr_count($basedir,'/',strpos($basedir,'wp-content/uploads'));
		
		$files=media::get_all_attachment_files($id);
		
		if(!is_dir($dir)){mkdir($dir,0777,true);}
		if(!file_exists($htaccess_file="{$basedir}/{$dirname}/.htaccess")){
			$subdir=substr($basedir,strpos($basedir,'/uploads')+9);
			if(!empty($subdir)){$subdir.='/';}
			file_put_contents(
				$htaccess_file,
				"RewriteEngine on\n".
				"RewriteRule (.+) ".str_repeat('../',$depth+1)."plugins/catpow/callee/protected_media.php?path={$subdir}{$dirname}/$1 [L,QSA]"
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
		$dirname=self::DIR_NAME;
		
		unset($metadata['protected']);
		$metadata['file']=preg_replace("|^{$dirname}/p\d+/|",'',$metadata['file']);
		
		$basedir=wp_get_upload_dir()['basedir'];
		$dir=$basedir.'/'.dirname($metadata['file']);
		
		$files=media::get_all_attachment_files($id);
		if(!is_dir($dir)){mkdir($dir,0777,true);}
		foreach($files as $file){
			if(file_exists($file)){rename($file,$dir.'/'.basename($file));}
		}
		dir::delete($basedir."/{$dirname}/p{$id}");
		update_post_meta($id,'_wp_attachment_metadata',$metadata);
		update_post_meta($id,'_wp_attached_file',$metadata['file']);
	}
	public static function set_cond($id,$cond){
		self::protect($id);
		$cond_file=dirname(get_attached_file($id)).'/cond.json';
		if(empty($cond)){unlink($cond_file);}
		file_put_contents($cond_file,json_encode($cond,0700));
	}
	public static function get_cond($id){
		$cond_file=dirname(get_attached_file($id)).'/cond.json';
		if(!file_exists($cond_file)){return null;}
		return json_decode(file_get_contents($cond_file),true);
	}
	public static function allow($id){
		\cp::$data['allowed_protected_media'][get_current_blog_id()][$id]=true;
	}
	public static function clear_allowed(){
		unset(\cp::$data['allowed_protected_media'][get_current_blog_id()]);
	}
	public static function is_allowed($id){
		return \cp::$data['allowed_protected_media'][get_current_blog_id()][$id]??false===true;
	}
}

?>