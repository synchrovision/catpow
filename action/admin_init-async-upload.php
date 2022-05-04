<?php
namespace Catpow;

add_action("add_attachment",function($id){
	$default_actions=[
		'/^(?P<type>'.implode('|',CP::get_preserved_class_names('api/images')).')\-(?P<name>[^\.]+)/'=>function($post,$matches){
			add_post_meta($post->ID,'is_'.$matches['type'],1);
			$class_name=CP::get_class_name('api','images',$matches['type']);
			add_post_meta($post->ID,'conf',$class_name::parse_file_name(basename($post->guid)));
		},
		'/^(?P<type>'.implode('|',CP::get_preserved_class_names('api/imageset')).')\-(?P<name>[^\.]+)/'=>function($post,$matches){
			add_post_meta($post->ID,'is_'.$matches['type'],1,true);
			$class_name=CP::get_class_name('api','imageset',$matches['type']);
			add_post_meta($post->ID,'conf',$class_name::parse_file_name(basename($post->guid)));
		}
	];
	$actions=array_merge($default_actions,$GLOBALS['post_types']['attachment']['bind']??[]);
	$post=get_post($id);
	foreach($actions as $pattern=>$action){
		if(preg_match($pattern,$post->post_title,$matches)){
			if(is_string($action)){
				$path=vsprintf($action,array_slice($matches,1));
				$path_data=\cp::parse_data_path($path);
				if(!is_numeric($path_data['data_id'])){
					return;
				}
				$conf_data=\cp::get_conf_data($path_data);
				$class_name=\cp::get_class_name('meta',$conf_data['type']);
				$class_name::set(
					$path_data['data_type'],
					$path_data['data_name'],
					$path_data['data_id'],
					$path_data['meta_path'][0]['meta_name'],
					[$id],
					$conf_data
				);
			}
			else if(is_callable($action)){
				$action($post,$matches);
			}
		}
	}
});

add_filter('wp_generate_attachment_metadata',function($metadata,$attachment_id){
	$dir=wp_upload_dir()['basedir'].'/'.dirname($metadata['file']);
	$sizes=$metadata['sizes'];
	$sizes['full']=['file'=>basename($metadata['file']),'mime-type'=>mime_content_type($dir.'/'.basename($metadata['file']))];
	$backup_sizes=[];
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
			imagewebp($im,$f.'.webp');
		}
		else{
			if(false===passthru("cwebp {$f} -o {$f}.webp")){continue;}
		}
		$backup_sizes[$size]=array_merge($size_data,['file'=>$size_data['file'].'.webp','mime-type'=>'imagewebp']);
	}
	if(!empty($backup_sizes)){
		add_post_meta($attachment_id,'_wp_attachment_backup_sizes',$backup_sizes);
	}
	return $metadata;
},10,2);