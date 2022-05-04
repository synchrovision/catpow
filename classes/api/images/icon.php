<?php
namespace Catpow\api\images;
/**
* アイコン画像一覧を取得
*/

class icon extends \Catpow\api{
	public static $param_pattern='(?P<param>\w+)',$param_default=['param'=>null];
	
	public static function call($req,$res){
		$data=[];
		$data_name=static::get_data_name();
		foreach(\cp::get_file_path_url('images/'.$data_name) as $dir_path=>$dir_url){
			foreach(glob($dir_path.'/*.{png,svg,gif,jpg}',defined('GLOB_BRACE')?GLOB_BRACE:0) as $image_file){
				$size=getimagesize($image_file);
				$data[]=[
					'url'=>$dir_url.'/'.basename($image_file),
					'path'=>$image_file,
					'width'=>$size[0]??false,
					'height'=>$size[1]??false,
					'alt'=>substr(basename($image_file),0,-4),
					'conf'=>static::parse_file_name(basename($image_file))
				];
			}
		}
		$posts=get_posts(['post_type'=>'attachment','nopaging'=>true,'meta_query'=>[
			['key'=>'is_'.$data_name,'value'=>1]
		]]);
		foreach($posts as $post){
			$image=wp_get_attachment_image_src($post->ID,'full');
			$data[]=[
				'url'=>$image[0],
				'path'=>get_attached_file($post->ID),
				'width'=>$image[1],
				'height'=>$image[2],
				'alt'=>get_post_meta($post->ID,'_wp_attachment_image_alt',true),
				'conf'=>get_post_meta($post->ID,'conf',true)
			];
		}
		$data=static::fill_data($data);
		$res->set_data($data);
	}
	public static function parse_file_name($name){
		$reg='/^((?P<type>'.static::get_data_name().')(?:\-'.static::$param_pattern.')?\-)?(?P<name>.+)(?P<ext>\.\w+)$/';
		preg_match($reg,$name,$matches);
		return array_merge(static::$param_default,array_filter(array_intersect_key($matches,static::$param_default)));
	}
	public static function fill_data($data){
		return $data;
	}
}

?>