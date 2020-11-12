<?php
namespace Catpow\api\imageset;
/**
* 画像セット一覧を取得
*/

class imageset extends \Catpow\api{
	public static function call($req,$res){
		$data=[];
		$data_name=static::get_data_name();
		foreach(\cp::get_file_path_url('images/'.$data_name) as $dir_path=>$dir_url){
			foreach(glob($dir_path.'/*',GLOB_ONLYDIR) as $set_dir_path){
				$set=basename($set_dir_path);
				if(file_exists($conf_file=$set_dir_path.'/conf.json')){
					$conf=json_decode(file_get_contents($conf_file),true);
					foreach($conf as $image_file_name=>$image_conf){
						$image_file=$set_dir_path.'/'.$image_file_name;
						if($image_file_name==='default' || !file_exists($image_file)){continue;}
						$size=getimagesize($image_file);
						$data[$set][]=array_merge($conf['default']??[],$image_conf,[
							'url'=>$dir_url.'/'.$set.'/'.$image_file_name,
							'width'=>$size[0]??false,
							'height'=>$size[1]??false,
							'alt'=>substr($image_file_name,0,-4),
						]);
					}
				}
			}
		}
		$posts=get_posts(['post_type'=>'attachment','nopaging'=>true,'meta_query'=>[
			['key'=>'is_'.$data_name,'value'=>1]
		]]);
		foreach($posts as $post){
			$image=wp_get_attachment_image_src($post->ID,'full');
			$set=get_post_meta($post->ID,'imageset',true);
			$data[$set][]=array_merge(get_post_meta($post->ID,'conf',true)?:[],[
				'url'=>$image[0],
				'width'=>$image[1],
				'height'=>$image[2],
				'alt'=>get_post_meta($post->ID,'_wp_attachment_image_alt',true),
			]);
		}
		$res->set_data($data);
	}
}

?>