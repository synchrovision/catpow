<?php
namespace Catpow\api\images;
/**
* アイコン画像一覧を取得
*/

class icon extends \Catpow\api{
	public static function call($req,$res){
		$data=[];
		$data_name=static::get_data_name();
		foreach(\cp::get_file_path_url('images/'.$data_name) as $dir_path=>$dir_url){
			foreach(glob($dir_path.'/*.{png,svg,gif,jpg}',GLOB_BRACE) as $image_file){
				$size=getimagesize($image_file);
				$data[]=[
					'url'=>$dir_url.'/'.basename($image_file),
					'width'=>$size[0]??false,
					'height'=>$size[1]??false,
					'alt'=>substr(basename($image_file),0,-4)
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
				'width'=>$image[1],
				'height'=>$image[2],
				'alt'=>get_post_meta($post->ID,'_wp_attachment_image_alt',true)
			];
		}
		$res->set_data($data);
	}
}

?>