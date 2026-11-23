<?php
namespace Catpow\meta;

class media extends meta{
	public static
		$input_type='file',
		$value_type='NUMERIC',
		$data_type='bigint(20)',
		$can_search=false;
	
	public static function output($meta,$prm){
		return static::get_output($meta->conf,$meta->value,$prm);
	}
	public static function get_output_html_data($meta,$prm){
		$output_class=(new \ReflectionMethod(static::class,'output'))->getDeclaringClass()->getName();
		if($output_class!==self::class){return parent::get_output_html_data($meta,$prm);}
		return static::get_media_output($meta->conf,$meta->value,$prm,true);
	}
	public static function input($meta,$prm){
		return static::get_input($meta->the_data_path,$meta->conf,$meta->value);
	}
	
	public static function get_props($meta){
		$rtn=['values'=>$meta->value];
		foreach($meta->value as $id){
			$rtn['files'][]=
				wp_attachment_is_image($id)?
				array_combine(['url','width','height','resized'],wp_get_attachment_image_src($id)):
				['url'=>wp_get_attachment_url($id)];
		}
		return $rtn;
	}
	
	public static function get_output($conf,$val,$prm){
		return static::get_media_output($conf,$val,$prm,false);
	}
	protected static function get_media_output($conf,$val,$prm,$as_html_data){
		$class=$as_html_data?($prm['class']??null):null;
		if(!is_numeric($val)){
			$path_url=\cp::get_file_path_url($val);
			if(empty($path_url)){return;}
			$path=key($path_url);
			$url=$path_url[$path];
			if($prm==='url'){return $url;}
			$type=mime_content_type($path);
			$alt=$conf['alt']??$conf['label']??'';
			if($prm==='type'){return $type;}
			if($prm==='alt'){return $alt;}
			$media=substr($type,0,5);
			if($media==='video' || $media==='audio'){
				return static::get_player_output($media,$url,$class,array_merge($conf,(array)$prm),$as_html_data);
			}
			if($as_html_data){return ['img','class'=>$class,'src'=>$url,'alt'=>$alt];}
			return sprintf('<img src="%s" alt="%s"/>',$url,$alt);
		}
		if($prm=='url'){return wp_get_attachment_url($val);}
		if(empty($post=get_post($val))){
			if(isset($conf['dummy'])){$dummy=get_template_directory_uri('/images/'.$conf['dummy']);}
			else{$dummy=\cp::get_file_url('images/dummy.jpg');}
			$alt=$conf['alt']??$conf['label']??'';
			if($as_html_data){return ['img','class'=>$class,'src'=>$dummy,'alt'=>$alt];}
			return sprintf('<img src="%s" alt="%s"/>',$dummy,$alt);
		}
		if($prm==='type'){return $post->post_mime_type;}
		if($prm==='alt'){return $post->_wp_attachment_image_alt;}
		switch($media=substr($post->post_mime_type,0,5)){
			case 'image':
				if(is_array($prm)){
					return wp_get_attachment_image($val,$prm['size']??'full');
				}
				return wp_get_attachment_image($val,has_image_size($prm)?$prm:'full');
			case 'video':
			case 'audio':
				return static::get_player_output($media,wp_get_attachment_url($val),$class,array_merge($conf,(array)$prm),$as_html_data);
		}
	}
	protected static function get_player_output($media,$url,$class,$prm,$as_html_data){
		if($as_html_data){return [$media,'class'=>$class,'src'=>$url]+static::get_player_attributes($prm);}
		return sprintf('<%1$s src="%2$s"%3$s></%1$s>',$media,$url,static::get_player_attr($prm));
	}
	public static function get_input($path,$conf,$val){
		if(isset($conf['dummy'])){$dummy=get_template_directory_uri('/images/'.$conf['dummy']);}
		else{$dummy=\cp::get_file_url('images/dummy.jpg');}
		
		wp_enqueue_media();
		wp_enqueue_script('jquery.catpow.media_upload');
		
		if(empty($val)){
			return sprintf(
				'<img class="ajax_upload_media image" src="%s"/><input type="hidden" name="%s"/>',
				$dummy,\cp::get_input_name($path)
			);
		}
		$post=get_post($val);
		if(empty($post)){
			return sprintf(
				'<img class="ajax_upload_media image" src="%s"/><input type="hidden" name="%s" value="%s"/>',
				$dummy,\cp::get_input_name($path),$val
			);
		}
		$src=wp_get_attachment_url($val);
		switch($media=substr($post->post_mime_type,0,5)){
			case 'image':
				return sprintf(
					'<img class="ajax_upload_media image" src="%s"/><input type="hidden" name="%s" value="%s"/>',
					$src?$src:$dummy,\cp::get_input_name($path),$val
				);
			case 'video':
				return sprintf(
					'<video class="ajax_upload_media video" src="%s"></video><input type="hidden" name="%s" value="%s"/>',
					$src,\cp::get_input_name($path),$val
				);
			case 'audio':
				return sprintf(
					'<audio class="ajax_upload_media audio" src="%s"></audio><input type="hidden" name="%s" value="%s"/>',
					$src,\cp::get_input_name($path),$val
				);
			default:
				return sprintf(
					'<img class="ajax_upload_media image" src="%s"/><input type="hidden" name="%s" value="%s"/>',
					$dummy,\cp::get_input_name($path),$val
				);
				
		}
	}
	public static function get_player_attr($prm){
		$attributes=array_filter(static::get_player_attributes($prm));
		return empty($attributes)?'':' '.implode(' ',array_keys($attributes));
	}
	public static function get_player_attributes($prm){
		return [
			'controls'=>!isset($prm['controls']) || !empty($prm['controls']),
			'autoplay'=>!empty($prm['autoplay']),
			'muted'=>!empty($prm['muted']),
			'playsinline'=>!empty($prm['playsinline']),
			'preload'=>!empty($prm['preload']),
			'loop'=>!empty($prm['loop'])
		];
	}
	public static function resolve_conf($conf){
		if(empty($conf['role'])){$conf['role']='image';}
		return $conf;
	}
}

?>